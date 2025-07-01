import { 
  mockFacilities, 
  mockESGData, 
  facilityParameterRegistries
} from './mockData';

export interface AggregatedMetrics {
  // Production metrics
  totalClinkerProduction: number;
  totalCementProduction: number;
  totalOPCProduction: number;
  totalPPCProduction: number;
  weightedClinkerFactor: number;
  weightedBlendedShare: number;

  // Energy metrics
  weightedSpecificHeatConsumption: number;
  weightedSpecificPowerConsumption: number;
  weightedTSR: number;
  weightedRenewableEnergyRatio: number;
  weightedPlantLoadFactor: number;

  // Emission metrics
  totalScope1Emissions: number;
  weightedEmissionIntensityScope1: number;
  weightedEmissionIntensityScope2: number;
  weightedEmissionIntensityTotal: number;

  // Social metrics
  totalEmployees: number;
  weightedLTIFR: number;
  weightedTrainingHours: number;
  weightedLocalEmployment: number;
  totalCSRSpend: number;
  weightedContractorSafety: number;

  // Governance metrics
  iso14001Compliance: number; // percentage of facilities
  iso45001Compliance: number;
  sustainabilityReporting: number;
  averageBoardIndependence: number;
  averageEthicsTraining: number;

  // Additional group metrics
  facilitiesCount: number;
  integratedPlantsCount: number;
  grindingUnitsCount: number;
  totalCapacityMTPA: number;
  averageDataCompleteness: number;
}

export interface FacilityContribution {
  facilityId: string;
  facilityName: string;
  contribution: number; // percentage contribution to group total
  value: number; // actual value
}

// Calculate weighted average based on production volumes
function calculateWeightedAverage(
  values: { facilityId: string; value: number; weight: number }[]
): number {
  const totalWeight = values.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight === 0) return 0;
  
  const weightedSum = values.reduce((sum, item) => sum + (item.value * item.weight), 0);
  return weightedSum / totalWeight;
}

// Get parameter value by ID from facility parameter registry
function getParameterValue(facilityId: string, parameterId: string): number {
  const registry = facilityParameterRegistries[facilityId];
  if (!registry) return 0;
  
  const param = registry.find(p => p.id.includes(parameterId));
  return param ? param.ytd : 0;
}

// Calculate group-wise aggregated metrics
export function calculateAggregatedMetrics(): AggregatedMetrics {
  const facilities = mockFacilities;
  
  // Production aggregation
  const totalClinkerProduction = facilities.reduce((sum, facility) => 
    sum + getParameterValue(facility.id, 'clinker_production'), 0);
  
  const totalCementProduction = facilities.reduce((sum, facility) => 
    sum + getParameterValue(facility.id, 'total_cement_produced'), 0);
  
  const totalOPCProduction = facilities.reduce((sum, facility) => 
    sum + getParameterValue(facility.id, 'total_opc_produced'), 0);
  
  const totalPPCProduction = facilities.reduce((sum, facility) => 
    sum + getParameterValue(facility.id, 'total_ppc_produced'), 0);

  // Energy aggregation (weighted by production)
  const cementProductionWeights = facilities.map(facility => ({
    facilityId: facility.id,
    value: getParameterValue(facility.id, 'specific_power_consumption_cementitious'),
    weight: getParameterValue(facility.id, 'total_cement_produced')
  }));

  const clinkerProductionWeights = facilities.map(facility => ({
    facilityId: facility.id,
    value: getParameterValue(facility.id, 'specific_heat_consumption'),
    weight: getParameterValue(facility.id, 'clinker_production')
  }));

  const weightedSpecificPowerConsumption = calculateWeightedAverage(cementProductionWeights);
  const weightedSpecificHeatConsumption = calculateWeightedAverage(clinkerProductionWeights);

  // TSR weighted by clinker production (only for integrated plants)
  const tsrWeights = facilities
    .filter(facility => facility.type === 'integrated')
    .map(facility => ({
      facilityId: facility.id,
      value: getParameterValue(facility.id, 'tsr_total'),
      weight: getParameterValue(facility.id, 'clinker_production')
    }));
  const weightedTSR = calculateWeightedAverage(tsrWeights);

  // Renewable energy ratio weighted by total power consumption
  const renewableWeights = facilities.map(facility => ({
    facilityId: facility.id,
    value: getParameterValue(facility.id, 'ratio_electrical_green_energy'),
    weight: getParameterValue(facility.id, 'total_cement_produced') * 
            getParameterValue(facility.id, 'specific_power_consumption_cementitious')
  }));
  const weightedRenewableEnergyRatio = calculateWeightedAverage(renewableWeights);

  // Plant load factor weighted by clinker production (integrated plants only)
  const plfWeights = facilities
    .filter(facility => facility.type === 'integrated')
    .map(facility => ({
      facilityId: facility.id,
      value: getParameterValue(facility.id, 'plant_load_factor'),
      weight: getParameterValue(facility.id, 'clinker_production')
    }));
  const weightedPlantLoadFactor = calculateWeightedAverage(plfWeights);

  // Clinker factor weighted by cement production
  const clinkerFactorWeights = facilities.map(facility => ({
    facilityId: facility.id,
    value: getParameterValue(facility.id, 'clinker_factor'),
    weight: getParameterValue(facility.id, 'total_cement_produced')
  }));
  const weightedClinkerFactor = calculateWeightedAverage(clinkerFactorWeights);

  // Blended share weighted by cement production
  const blendedShareWeights = facilities.map(facility => ({
    facilityId: facility.id,
    value: getParameterValue(facility.id, 'blended_cements_share'),
    weight: getParameterValue(facility.id, 'total_cement_produced')
  }));
  const weightedBlendedShare = calculateWeightedAverage(blendedShareWeights);

  // Emissions aggregation
  const totalScope1Emissions = facilities.reduce((sum, facility) => 
    sum + getParameterValue(facility.id, 'scope1_total'), 0);

  const emissionIntensityWeights = facilities.map(facility => ({
    facilityId: facility.id,
    scope1: getParameterValue(facility.id, 'emission_intensity_scope1'),
    scope2: getParameterValue(facility.id, 'emission_intensity_scope2'),
    total: getParameterValue(facility.id, 'emission_intensity_total'),
    weight: getParameterValue(facility.id, 'total_cement_produced')
  }));

  const weightedEmissionIntensityScope1 = calculateWeightedAverage(
    emissionIntensityWeights.map(item => ({ facilityId: item.facilityId, value: item.scope1, weight: item.weight }))
  );
  
  const weightedEmissionIntensityScope2 = calculateWeightedAverage(
    emissionIntensityWeights.map(item => ({ facilityId: item.facilityId, value: item.scope2, weight: item.weight }))
  );
  
  const weightedEmissionIntensityTotal = calculateWeightedAverage(
    emissionIntensityWeights.map(item => ({ facilityId: item.facilityId, value: item.total, weight: item.weight }))
  );

  // Social metrics aggregation
  const totalEmployees = facilities.reduce((sum, facility) => 
    sum + (mockESGData[facility.id]?.social.employees || 0), 0);

  const totalCSRSpend = facilities.reduce((sum, facility) => 
    sum + (mockESGData[facility.id]?.social.csrSpend || 0), 0);

  // Employee-weighted averages for social metrics
  const employeeWeights = facilities.map(facility => ({
    facilityId: facility.id,
    ltifr: mockESGData[facility.id]?.social.ltifr || 0,
    trainingHours: mockESGData[facility.id]?.social.trainingHours || 0,
    localEmployment: mockESGData[facility.id]?.social.localEmployment || 0,
    contractorSafety: mockESGData[facility.id]?.social.contractorSafety || 0,
    weight: mockESGData[facility.id]?.social.employees || 0
  }));

  const weightedLTIFR = calculateWeightedAverage(
    employeeWeights.map(item => ({ facilityId: item.facilityId, value: item.ltifr, weight: item.weight }))
  );
  
  const weightedTrainingHours = calculateWeightedAverage(
    employeeWeights.map(item => ({ facilityId: item.facilityId, value: item.trainingHours, weight: item.weight }))
  );
  
  const weightedLocalEmployment = calculateWeightedAverage(
    employeeWeights.map(item => ({ facilityId: item.facilityId, value: item.localEmployment, weight: item.weight }))
  );
  
  const weightedContractorSafety = calculateWeightedAverage(
    employeeWeights.map(item => ({ facilityId: item.facilityId, value: item.contractorSafety, weight: item.weight }))
  );

  // Governance metrics
  const iso14001Count = facilities.filter(facility => 
    mockESGData[facility.id]?.governance.iso14001).length;
  const iso45001Count = facilities.filter(facility => 
    mockESGData[facility.id]?.governance.iso45001).length;
  const sustainabilityReportingCount = facilities.filter(facility => 
    mockESGData[facility.id]?.governance.sustainabilityReporting).length;

  const averageBoardIndependence = facilities.reduce((sum, facility) => 
    sum + (mockESGData[facility.id]?.governance.boardIndependence || 0), 0) / facilities.length;
  
  const averageEthicsTraining = facilities.reduce((sum, facility) => 
    sum + (mockESGData[facility.id]?.governance.ethicsTraining || 0), 0) / facilities.length;

  // Additional group metrics
  const integratedPlantsCount = facilities.filter(f => f.type === 'integrated').length;
  const grindingUnitsCount = facilities.filter(f => f.type === 'grinding').length;
  
  const totalCapacityMTPA = facilities.reduce((sum, facility) => {
    const capacityStr = facility.capacity.replace(' MTPA', '');
    return sum + parseFloat(capacityStr);
  }, 0);

  const averageDataCompleteness = facilities.reduce((sum, facility) => 
    sum + facility.dataCompleteness, 0) / facilities.length;

  return {
    totalClinkerProduction,
    totalCementProduction,
    totalOPCProduction,
    totalPPCProduction,
    weightedClinkerFactor,
    weightedBlendedShare,
    weightedSpecificHeatConsumption,
    weightedSpecificPowerConsumption,
    weightedTSR,
    weightedRenewableEnergyRatio,
    weightedPlantLoadFactor,
    totalScope1Emissions,
    weightedEmissionIntensityScope1,
    weightedEmissionIntensityScope2,
    weightedEmissionIntensityTotal,
    totalEmployees,
    weightedLTIFR,
    weightedTrainingHours,
    weightedLocalEmployment,
    totalCSRSpend,
    weightedContractorSafety,
    iso14001Compliance: (iso14001Count / facilities.length) * 100,
    iso45001Compliance: (iso45001Count / facilities.length) * 100,
    sustainabilityReporting: (sustainabilityReportingCount / facilities.length) * 100,
    averageBoardIndependence,
    averageEthicsTraining,
    facilitiesCount: facilities.length,
    integratedPlantsCount,
    grindingUnitsCount,
    totalCapacityMTPA,
    averageDataCompleteness
  };
}

// Get facility contributions for a specific metric
export function getFacilityContributions(
  metricType: 'production' | 'emissions' | 'employees',
  parameterId?: string
): FacilityContribution[] {
  const facilities = mockFacilities;
  
  const contributions = facilities.map(facility => {
    let value = 0;
    
    switch (metricType) {
      case 'production':
        value = parameterId ? getParameterValue(facility.id, parameterId) : 
                getParameterValue(facility.id, 'total_cement_produced');
        break;
      case 'emissions':
        value = getParameterValue(facility.id, 'scope1_total');
        break;
      case 'employees':
        value = mockESGData[facility.id]?.social.employees || 0;
        break;
    }
    
    return {
      facilityId: facility.id,
      facilityName: facility.name,
      value
    };
  });
  
  const total = contributions.reduce((sum, item) => sum + item.value, 0);
  
  return contributions.map(item => ({
    ...item,
    contribution: total > 0 ? (item.value / total) * 100 : 0
  }));
}

// Get aggregated chart data for production overview
export function getAggregatedProductionData() {
  const metrics = calculateAggregatedMetrics();
  
  return [
    { 
      name: 'Total Clinker', 
      value: metrics.totalClinkerProduction, 
      color: '#074D47' 
    },
    { 
      name: 'Total Cement', 
      value: metrics.totalCementProduction, 
      color: '#22867C' 
    }
  ];
}

// Get aggregated energy performance data
export function getAggregatedEnergyData() {
  const metrics = calculateAggregatedMetrics();
  
  return [
    { 
      category: 'Specific Heat (Weighted Avg)', 
      value: metrics.weightedSpecificHeatConsumption, 
      unit: 'kcal/kg', 
      target: 700 
    },
    { 
      category: 'Specific Power (Weighted Avg)', 
      value: metrics.weightedSpecificPowerConsumption, 
      unit: 'kWh/t', 
      target: 65 
    },
    { 
      category: 'Renewable Energy (Weighted Avg)', 
      value: metrics.weightedRenewableEnergyRatio, 
      unit: '%', 
      target: 30 
    }
  ];
}

// Get facility-wise breakdown for charts
export function getFacilityBreakdownData(metric: 'clinker' | 'cement' | 'emissions') {
  const facilities = mockFacilities;
  
  return facilities.map(facility => {
    let value = 0;
    let name = facility.name;
    
    switch (metric) {
      case 'clinker':
        value = getParameterValue(facility.id, 'clinker_production');
        break;
      case 'cement':
        value = getParameterValue(facility.id, 'total_cement_produced');
        break;
      case 'emissions':
        value = getParameterValue(facility.id, 'scope1_total');
        break;
    }
    
    return {
      name,
      value,
      type: facility.type,
      capacity: facility.capacity
    };
  }).filter(item => item.value > 0); // Filter out zero values (e.g., grinding units for clinker)
}