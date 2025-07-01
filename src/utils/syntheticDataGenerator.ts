import { Parameter } from './mockData';

// Base monthly data variations for realistic trends
const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];

// Seasonal factors for different types of data
const seasonalFactors = {
  production: [1.0, 1.1, 1.05, 0.8, 0.6, 0.95, 1.0, 1.05, 0.9, 1.15, 1.08], // Lower in monsoon (Jul-Aug)
  energy: [1.0, 0.98, 0.96, 0.98, 1.02, 1.0, 0.99, 0.97, 1.01, 0.96, 1.0], // Slight variations
  emissions: [1.0, 1.02, 1.0, 0.95, 0.92, 0.98, 1.01, 1.03, 0.98, 1.04, 1.02] // Follows production trends
};

// Facility type multipliers
const facilityTypeMultipliers = {
  integrated: {
    production: 1.0,
    energy: 1.0,
    emissions: 1.0
  },
  grinding: {
    production: 0.6, // No clinker production
    energy: 0.4, // Lower energy consumption
    emissions: 0.15 // Much lower emissions (no calcination)
  }
};

// Capacity-based scaling factors
const capacityScaling: Record<string, number> = {
  '3.0 MTPA': 1.0, // Base (Mattampally)
  '1.25 MTPA': 0.42,
  '1.5 MTPA': 0.5,
  '1.0 MTPA': 0.33,
  '2.25 MTPA': 0.75
};

interface FacilityConfig {
  id: string;
  name: string;
  type: 'integrated' | 'grinding';
  capacity: string;
  performanceMultiplier: number; // 0.8-1.2 for facility efficiency variations
}

export function generateMonthlyData(
  baseValue: number,
  category: 'production' | 'energy' | 'emissions',
  facilityConfig: FacilityConfig,
  variationPercent: number = 10
): { month: string; value: number }[] {
  const capacityScale = capacityScaling[facilityConfig.capacity] || 1.0;
  const typeMultiplier = facilityTypeMultipliers[facilityConfig.type][category];
  const scaledBaseValue = baseValue * capacityScale * typeMultiplier * facilityConfig.performanceMultiplier;
  
  return months.map((month, index) => {
    const seasonalFactor = seasonalFactors[category][index];
    const randomVariation = 1 + (Math.random() - 0.5) * (variationPercent / 100);
    const value = Math.round(scaledBaseValue * seasonalFactor * randomVariation);
    
    return { month, value: Math.max(0, value) };
  });
}

export function generateParameter(
  baseParam: Parameter,
  facilityConfig: FacilityConfig,
  customMultiplier?: number
): Parameter {
  const multiplier = customMultiplier || 1.0;
  const monthlyData = generateMonthlyData(
    baseParam.ytd / baseParam.monthlyData.length * multiplier,
    baseParam.category,
    facilityConfig,
    15 // 15% variation
  );
  
  const ytd = monthlyData.reduce((sum, data) => sum + data.value, 0);
  
  return {
    ...baseParam,
    id: `${facilityConfig.id}_${baseParam.id}`,
    monthlyData,
    ytd
  };
}

// Generate facility-specific parameters based on facility type and characteristics
export function generateFacilityParameters(facilityConfig: FacilityConfig): Parameter[] {
  const baseParameters: Omit<Parameter, 'monthlyData' | 'ytd'>[] = [
    // PRODUCTION PARAMETERS
    {
      id: 'clinker_production',
      name: 'Clinker Production',
      category: 'production',
      subcategory: 'Material Flow',
      unit: 'Tons',
      description: 'Total kiln clinker made'
    },
    {
      id: 'clinker_consumed',
      name: 'Clinker Consumed',
      category: 'production',
      subcategory: 'Material Flow',
      unit: 'Tons',
      description: 'Clinker fed to cement mill'
    },
    {
      id: 'total_cement_produced',
      name: 'Total Cement Produced',
      category: 'production',
      subcategory: 'Material Flow',
      unit: 'Tons',
      description: 'Sum of clinker consumed and alternative cementitious material'
    },
    {
      id: 'total_opc_produced',
      name: 'Total OPC Produced',
      category: 'production',
      subcategory: 'Cement Types',
      unit: 'Tons',
      description: 'Total OPC produced'
    },
    {
      id: 'total_ppc_produced',
      name: 'Total PPC Produced',
      category: 'production',
      subcategory: 'Cement Types',
      unit: 'Tons',
      description: 'Total PPC produced'
    },
    {
      id: 'clinker_factor',
      name: 'Clinker Factor',
      category: 'production',
      subcategory: 'Ratios & Factors',
      unit: '%',
      description: 'Clinker consumed divided by total cementitious produced'
    },
    {
      id: 'blended_cements_share',
      name: 'Blended Cements Share',
      category: 'production',
      subcategory: 'Ratios & Factors',
      unit: '%',
      description: 'Total blended cements divided by total cement produced times 100'
    },

    // ENERGY PARAMETERS
    {
      id: 'specific_heat_consumption',
      name: 'Specific Heat Consumption',
      category: 'energy',
      subcategory: 'Heat Consumption',
      unit: 'Kcal/kg of clinker',
      description: 'Specific Heat Consumption'
    },
    {
      id: 'specific_power_consumption_cementitious',
      name: 'Specific Power Consumption for Cementitious',
      category: 'energy',
      subcategory: 'Power Consumption',
      unit: 'KWH/t of cementitious',
      description: 'Specific power consumption for cementitious'
    },
    {
      id: 'tsr_total',
      name: 'TSR (Thermal Substitution Ratio)',
      category: 'energy',
      subcategory: 'Alternative Fuels',
      unit: '%',
      description: 'TSR'
    },
    {
      id: 'ratio_electrical_green_energy',
      name: 'Ratio of Electrical Green Energy',
      category: 'energy',
      subcategory: 'Renewable Energy',
      unit: '%',
      description: 'Ratio of electrical green energy'
    },
    {
      id: 'plant_load_factor',
      name: 'Plant Load Factor',
      category: 'energy',
      subcategory: 'Power Generation',
      unit: '%',
      description: 'Plant Load Factor'
    },

    // EMISSIONS PARAMETERS
    {
      id: 'scope1_total',
      name: 'Scope 1 Total Emissions',
      category: 'emissions',
      subcategory: 'Scope-wise Emissions',
      unit: 'TCO2',
      description: 'Total Scope 1 emissions'
    },
    {
      id: 'emission_intensity_scope1',
      name: 'Emission Intensity - Scope 1',
      category: 'emissions',
      subcategory: 'Emission Intensity',
      unit: 'kg CO2/t cementitious',
      description: 'Emission intensity - Scope 1'
    },
    {
      id: 'emission_intensity_scope2',
      name: 'Emission Intensity - Scope 2',
      category: 'emissions',
      subcategory: 'Emission Intensity',
      unit: 'kg CO2/t cementitious',
      description: 'Emission intensity - Scope 2'
    },
    {
      id: 'emission_intensity_total',
      name: 'Total Emission Intensity',
      category: 'emissions',
      subcategory: 'Emission Intensity',
      unit: 'kg CO2/t cementitious',
      description: 'Total emission intensity'
    }
  ];

  // Base values for different parameter types - based on Mattampally actual data
  const baseValues: Record<string, number> = {
    // Production (annual values) - scaled appropriately by facility type and capacity
    clinker_production: facilityConfig.type === 'integrated' ? 1679081 : 0,
    clinker_consumed: facilityConfig.type === 'integrated' ? 1108944 : 
                     Math.round(1371802 * 0.8), // For grinding units, clinker consumed ≈ 80% of cement production
    total_cement_produced: 1371802,
    total_opc_produced: Math.round(1371802 * 0.553), // 55.3% OPC based on actual data
    total_ppc_produced: Math.round(1371802 * 0.419), // 41.9% PPC based on actual data
    clinker_factor: facilityConfig.type === 'integrated' ? 0.81 : 0.75, // Lower for grinding units
    blended_cements_share: facilityConfig.type === 'integrated' ? 45 : 40, // Slightly lower for grinding

    // Energy (rates and ratios) - realistic values based on facility type
    specific_heat_consumption: facilityConfig.type === 'integrated' ? 711 : 0, // Only for integrated plants
    specific_power_consumption_cementitious: facilityConfig.type === 'integrated' ? 71 : 35, // Lower for grinding
    tsr_total: facilityConfig.type === 'integrated' ? 9 : 0, // Only integrated plants use alternative fuels
    ratio_electrical_green_energy: facilityConfig.type === 'integrated' ? 25.39 : 15, // Lower for grinding units
    plant_load_factor: facilityConfig.type === 'integrated' ? 68 : 0, // Only integrated plants have CPP

    // Emissions - much lower for grinding units
    scope1_total: facilityConfig.type === 'integrated' ? 1441674 : Math.round(1441674 * 0.05), // 5% for grinding
    emission_intensity_scope1: facilityConfig.type === 'integrated' ? 742 : 45, // Much lower for grinding
    emission_intensity_scope2: 6, // Grid power emissions - similar for both types
    emission_intensity_total: facilityConfig.type === 'integrated' ? 752 : 52 // Total for grinding ≈ 50-55
  };

  return baseParameters.map(param => {
    const baseValue = baseValues[param.id] || 100;
    const monthlyData = generateMonthlyData(
      baseValue / 11, // Convert annual to monthly average
      param.category,
      facilityConfig,
      12 // 12% variation
    );
    
    const ytd = monthlyData.reduce((sum, data) => sum + data.value, 0);
    
    return {
      ...param,
      id: `${facilityConfig.id}_${param.id}`,
      monthlyData,
      ytd
    };
  });
}

// Generate cement type distribution based on facility characteristics
export function generateCementTypes(facilityConfig: FacilityConfig, totalProduction: number) {
  const baseDistribution = facilityConfig.type === 'integrated' 
    ? [
        { type: 'OPC', percentage: 55.3 },
        { type: 'PPC', percentage: 41.9 },
        { type: 'Super PPC', percentage: 2.8 },
        { type: 'Others', percentage: 0 }
      ]
    : [
        { type: 'OPC', percentage: 60 },
        { type: 'PPC', percentage: 35 },
        { type: 'Super PPC', percentage: 5 },
        { type: 'Others', percentage: 0 }
      ];

  return baseDistribution.map(item => ({
    ...item,
    production: Math.round(totalProduction * item.percentage / 100)
  }));
}

// Generate power source breakdown
export function generatePowerSources(facilityConfig: FacilityConfig, totalPowerMWh: number) {
  const baseSources = facilityConfig.type === 'integrated'
    ? [
        { source: 'Grid', percentage: 12.0 },
        { source: 'Onsite CPP', percentage: 62.6 },
        { source: 'WHRS', percentage: 24.5 },
        { source: 'Solar', percentage: 0.9 }
      ]
    : [
        { source: 'Grid', percentage: 85.0 },
        { source: 'Solar', percentage: 15.0 },
        { source: 'Onsite CPP', percentage: 0 },
        { source: 'WHRS', percentage: 0 }
      ];

  return baseSources.map(source => ({
    ...source,
    mwh: Math.round(totalPowerMWh * source.percentage / 100)
  }));
}