import { User, Facility, ESGData } from '../types';
import { 
  generateFacilityParameters, 
  generateCementTypes, 
  generatePowerSources 
} from './syntheticDataGenerator';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'System Administrator'
  },
  {
    id: '2',
    username: 'facility1',
    password: 'facility123',
    role: 'facility_head',
    facilityId: 'fac1',
    name: 'John Smith'
  },
  {
    id: '3',
    username: 'facility2',
    password: 'facility123',
    role: 'facility_head',
    facilityId: 'fac2',
    name: 'Jane Doe'
  },
  {
    id: '4',
    username: 'facility3',
    password: 'facility123',
    role: 'facility_head',
    facilityId: 'fac3',
    name: 'Mike Johnson'
  },
  {
    id: '5',
    username: 'facility4',
    password: 'facility123',
    role: 'facility_head',
    facilityId: 'fac4',
    name: 'Sarah Williams'
  },
  {
    id: '6',
    username: 'facility5',
    password: 'facility123',
    role: 'facility_head',
    facilityId: 'fac5',
    name: 'Rajesh Kumar'
  },
  {
    id: '7',
    username: 'facility6',
    password: 'facility123',
    role: 'facility_head',
    facilityId: 'fac6',
    name: 'Priya Sharma'
  }
];

export const mockFacilities: Facility[] = [
  {
    id: 'fac1',
    name: 'Mattampally',
    location: 'Telangana',
    capacity: '3.0 MTPA',
    type: 'integrated',
    esgScore: 78,
    dataCompleteness: 85,
    manager: 'John Smith',
    lastUpdated: '2024-06-20'
  },
  {
    id: 'fac2',
    name: 'Gudipadu',
    location: 'Andhra Pradesh',
    capacity: '1.25 MTPA',
    type: 'integrated',
    esgScore: 82,
    dataCompleteness: 92,
    manager: 'Jane Doe',
    lastUpdated: '2024-06-21'
  },
  {
    id: 'fac3',
    name: 'Bayyavaram',
    location: 'Andhra Pradesh',
    capacity: '1.5 MTPA',
    type: 'grinding',
    esgScore: 89,
    dataCompleteness: 78,
    manager: 'Mike Johnson',
    lastUpdated: '2024-06-19'
  },
  {
    id: 'fac4',
    name: 'Jajpur',
    location: 'Odisha',
    capacity: '1.5 MTPA',
    type: 'grinding',
    esgScore: 91,
    dataCompleteness: 96,
    manager: 'Sarah Williams',
    lastUpdated: '2024-06-21'
  },
  {
    id: 'fac5',
    name: 'Jeerabad',
    location: 'Madhya Pradesh',
    capacity: '1.0 MTPA',
    type: 'integrated',
    company: 'Sagar Cements (M) Private Limited',
    esgScore: 86,
    dataCompleteness: 88,
    manager: 'Rajesh Kumar',
    lastUpdated: '2024-06-20'
  },
  {
    id: 'fac6',
    name: 'Dachepalli',
    location: 'Andhra Pradesh',
    capacity: '2.25 MTPA',
    type: 'integrated',
    company: 'Andhra Cements Limited',
    esgScore: 84,
    dataCompleteness: 90,
    manager: 'Priya Sharma',
    lastUpdated: '2024-06-21'
  }
];

export const mockESGData: Record<string, ESGData> = {
  fac1: { // Mattampally - Largest integrated plant - ACTUAL DATA
    environmental: {
      co2PerTon: 752, // kg CO2/t cementitious (from emission intensity total)
      thermalEnergy: 711, // kcal/kg of clinker (specific heat consumption)
      electricalEnergy: 71, // kWh/t of cementitious (specific power consumption)
      altFuelUsage: 9, // % (TSR total)
      clinkerFactor: 0.81, // clinker factor from actual data
      waterPerTon: 120, // estimated - not in provided data
      dustEmissions: 28, // estimated - not in provided data
      noxEmissions: 180, // estimated - not in provided data
      soxEmissions: 45, // estimated - not in provided data
      wasteHeatRecovery: 33.7, // MWh from WHRS (33,722 MWh total delivered)
      greenCover: 145 // estimated - not in provided data
    },
    social: {
      employees: 450, // estimated - not in provided data
      ltifr: 0.8, // estimated - not in provided data
      trainingHours: 24, // estimated - not in provided data
      localEmployment: 78, // estimated - not in provided data
      csrSpend: 8.5, // estimated - not in provided data
      contractorSafety: 1.2 // estimated - not in provided data
    },
    governance: {
      iso14001: true,
      iso45001: true,
      sustainabilityReporting: true,
      boardIndependence: 60,
      ethicsTraining: 92
    }
  },
  fac2: { // Gudipadu - Integrated plant
    environmental: {
      co2PerTon: 695,
      thermalEnergy: 735,
      electricalEnergy: 82,
      altFuelUsage: 18,
      clinkerFactor: 0.84,
      waterPerTon: 135,
      dustEmissions: 30,
      noxEmissions: 195,
      soxEmissions: 50,
      wasteHeatRecovery: 8,
      greenCover: 68
    },
    social: {
      employees: 320,
      ltifr: 0.9,
      trainingHours: 22,
      localEmployment: 82,
      csrSpend: 5.2,
      contractorSafety: 1.4
    },
    governance: {
      iso14001: true,
      iso45001: true,
      sustainabilityReporting: true,
      boardIndependence: 65,
      ethicsTraining: 94
    }
  },
  fac3: { // Bayyavaram - Grinding unit
    environmental: {
      co2PerTon: 45, // Lower as it's grinding only
      thermalEnergy: 0, // No clinker production
      electricalEnergy: 32,
      altFuelUsage: 0,
      clinkerFactor: 0.75,
      waterPerTon: 45,
      dustEmissions: 20,
      noxEmissions: 0,
      soxEmissions: 0,
      wasteHeatRecovery: 0,
      greenCover: 42
    },
    social: {
      employees: 200,
      ltifr: 0.5,
      trainingHours: 28,
      localEmployment: 85,
      csrSpend: 3.8,
      contractorSafety: 0.8
    },
    governance: {
      iso14001: true,
      iso45001: true,
      sustainabilityReporting: true,
      boardIndependence: 75,
      ethicsTraining: 96
    }
  },
  fac4: { // Jajpur - Grinding unit
    environmental: {
      co2PerTon: 48,
      thermalEnergy: 0,
      electricalEnergy: 35,
      altFuelUsage: 0,
      clinkerFactor: 0.76,
      waterPerTon: 50,
      dustEmissions: 22,
      noxEmissions: 0,
      soxEmissions: 0,
      wasteHeatRecovery: 0,
      greenCover: 38
    },
    social: {
      employees: 150,
      ltifr: 0.4,
      trainingHours: 30,
      localEmployment: 88,
      csrSpend: 3.2,
      contractorSafety: 0.6
    },
    governance: {
      iso14001: true,
      iso45001: true,
      sustainabilityReporting: true,
      boardIndependence: 80,
      ethicsTraining: 98
    }
  },
  fac5: { // Jeerabad - Integrated plant (subsidiary)
    environmental: {
      co2PerTon: 710,
      thermalEnergy: 745,
      electricalEnergy: 85,
      altFuelUsage: 15,
      clinkerFactor: 0.86,
      waterPerTon: 145,
      dustEmissions: 32,
      noxEmissions: 205,
      soxEmissions: 55,
      wasteHeatRecovery: 6,
      greenCover: 52
    },
    social: {
      employees: 280,
      ltifr: 1.1,
      trainingHours: 20,
      localEmployment: 75,
      csrSpend: 4.5,
      contractorSafety: 1.5
    },
    governance: {
      iso14001: true,
      iso45001: false,
      sustainabilityReporting: true,
      boardIndependence: 55,
      ethicsTraining: 88
    }
  },
  fac6: { // Dachepalli - Integrated plant (subsidiary)
    environmental: {
      co2PerTon: 690,
      thermalEnergy: 730,
      electricalEnergy: 80,
      altFuelUsage: 20,
      clinkerFactor: 0.83,
      waterPerTon: 125,
      dustEmissions: 29,
      noxEmissions: 185,
      soxEmissions: 48,
      wasteHeatRecovery: 10,
      greenCover: 98
    },
    social: {
      employees: 380,
      ltifr: 0.7,
      trainingHours: 26,
      localEmployment: 80,
      csrSpend: 6.8,
      contractorSafety: 1.0
    },
    governance: {
      iso14001: true,
      iso45001: true,
      sustainabilityReporting: true,
      boardIndependence: 70,
      ethicsTraining: 90
    }
  }
};

// Parameter interface for comprehensive data structure
export interface Parameter {
  id: string;
  name: string;
  category: 'production' | 'energy' | 'emissions';
  subcategory: string;
  unit: string;
  description: string;
  monthlyData: { month: string; value: number }[];
  ytd: number;
}

// Complete parameter registry for Mattampally Plant
export const parameterRegistry: Parameter[] = [
  // PRODUCTION PARAMETERS
  {
    id: 'clinker_production',
    name: 'Clinker Production',
    category: 'production',
    subcategory: 'Material Flow',
    unit: 'Tons',
    description: 'Total kiln clinker made',
    monthlyData: [
      { month: 'Apr', value: 163252 }, { month: 'May', value: 190158 }, { month: 'Jun', value: 174611 },
      { month: 'Jul', value: 108753 }, { month: 'Aug', value: 70042 }, { month: 'Sep', value: 143775 },
      { month: 'Oct', value: 162306 }, { month: 'Nov', value: 175389 }, { month: 'Dec', value: 138981 },
      { month: 'Jan', value: 185331 }, { month: 'Feb', value: 166483 }
    ],
    ytd: 1679081
  },
  {
    id: 'clinker_consumed',
    name: 'Clinker Consumed',
    category: 'production',
    subcategory: 'Material Flow',
    unit: 'Tons',
    description: 'Clinker fed to cement mill',
    monthlyData: [
      { month: 'Apr', value: 103502 }, { month: 'May', value: 81255 }, { month: 'Jun', value: 110023 },
      { month: 'Jul', value: 86796 }, { month: 'Aug', value: 96231 }, { month: 'Sep', value: 72637 },
      { month: 'Oct', value: 91703 }, { month: 'Nov', value: 95995 }, { month: 'Dec', value: 119840 },
      { month: 'Jan', value: 114382 }, { month: 'Feb', value: 136580 }
    ],
    ytd: 1108944
  },
  {
    id: 'total_cement_produced',
    name: 'Total Cement Produced',
    category: 'production',
    subcategory: 'Material Flow',
    unit: 'Tons',
    description: 'Sum of clinker consumed and alternative cementitious material',
    monthlyData: [
      { month: 'Apr', value: 129975 }, { month: 'May', value: 102090 }, { month: 'Jun', value: 135932 },
      { month: 'Jul', value: 108080 }, { month: 'Aug', value: 116550 }, { month: 'Sep', value: 90995 },
      { month: 'Oct', value: 114870 }, { month: 'Nov', value: 119515 }, { month: 'Dec', value: 147355 },
      { month: 'Jan', value: 141930 }, { month: 'Feb', value: 164510 }
    ],
    ytd: 1371802
  },
  {
    id: 'total_opc_produced',
    name: 'Total OPC Produced',
    category: 'production',
    subcategory: 'Cement Types',
    unit: 'Tons',
    description: 'Total OPC produced',
    monthlyData: [
      { month: 'Apr', value: 70695 }, { month: 'May', value: 55505 }, { month: 'Jun', value: 75935 },
      { month: 'Jul', value: 58160 }, { month: 'Aug', value: 66535 }, { month: 'Sep', value: 45010 },
      { month: 'Oct', value: 60540 }, { month: 'Nov', value: 63715 }, { month: 'Dec', value: 82920 },
      { month: 'Jan', value: 77055 }, { month: 'Feb', value: 102475 }
    ],
    ytd: 758545
  },
  {
    id: 'total_ppc_produced',
    name: 'Total PPC Produced',
    category: 'production',
    subcategory: 'Cement Types',
    unit: 'Tons',
    description: 'Total PPC produced',
    monthlyData: [
      { month: 'Apr', value: 59280 }, { month: 'May', value: 46585 }, { month: 'Jun', value: 54938 },
      { month: 'Jul', value: 45717 }, { month: 'Aug', value: 47209 }, { month: 'Sep', value: 42552 },
      { month: 'Oct', value: 50617 }, { month: 'Nov', value: 51380 }, { month: 'Dec', value: 57644 },
      { month: 'Jan', value: 61263 }, { month: 'Feb', value: 57434 }
    ],
    ytd: 574619
  },
  {
    id: 'clinker_factor',
    name: 'Clinker Factor',
    category: 'production',
    subcategory: 'Ratios & Factors',
    unit: '%',
    description: 'Clinker consumed divided by total cementitious produced',
    monthlyData: [
      { month: 'Apr', value: 0.80 }, { month: 'May', value: 0.80 }, { month: 'Jun', value: 0.81 },
      { month: 'Jul', value: 0.80 }, { month: 'Aug', value: 0.83 }, { month: 'Sep', value: 0.80 },
      { month: 'Oct', value: 0.80 }, { month: 'Nov', value: 0.80 }, { month: 'Dec', value: 0.81 },
      { month: 'Jan', value: 0.81 }, { month: 'Feb', value: 0.83 }
    ],
    ytd: 0.81
  },
  {
    id: 'blended_cements_share',
    name: 'Blended Cements Share',
    category: 'production',
    subcategory: 'Ratios & Factors',
    unit: '%',
    description: 'Total blended cements divided by total cement produced times 100',
    monthlyData: [
      { month: 'Apr', value: 46 }, { month: 'May', value: 46 }, { month: 'Jun', value: 44 },
      { month: 'Jul', value: 46 }, { month: 'Aug', value: 43 }, { month: 'Sep', value: 51 },
      { month: 'Oct', value: 47 }, { month: 'Nov', value: 47 }, { month: 'Dec', value: 44 },
      { month: 'Jan', value: 46 }, { month: 'Feb', value: 38 }
    ],
    ytd: 45
  },

  // ENERGY PARAMETERS
  {
    id: 'specific_heat_consumption',
    name: 'Specific Heat Consumption',
    category: 'energy',
    subcategory: 'Heat Consumption',
    unit: 'Kcal/kg of clinker',
    description: 'Specific Heat Consumption',
    monthlyData: [
      { month: 'Apr', value: 725 }, { month: 'May', value: 711 }, { month: 'Jun', value: 703 },
      { month: 'Jul', value: 703 }, { month: 'Aug', value: 704 }, { month: 'Sep', value: 705 },
      { month: 'Oct', value: 708 }, { month: 'Nov', value: 710 }, { month: 'Dec', value: 713 },
      { month: 'Jan', value: 708 }, { month: 'Feb', value: 723 }
    ],
    ytd: 711
  },
  {
    id: 'specific_power_consumption_cementitious',
    name: 'Specific Power Consumption for Cementitious',
    category: 'energy',
    subcategory: 'Power Consumption',
    unit: 'KWH/t of cementitious',
    description: 'Specific power consumption for cementitious',
    monthlyData: [
      { month: 'Apr', value: 69.80 }, { month: 'May', value: 63.96 }, { month: 'Jun', value: 69.62 },
      { month: 'Jul', value: 75.88 }, { month: 'Aug', value: 89.80 }, { month: 'Sep', value: 68.50 },
      { month: 'Oct', value: 68.55 }, { month: 'Nov', value: 67.11 }, { month: 'Dec', value: 75.31 },
      { month: 'Jan', value: 68.93 }, { month: 'Feb', value: 74 }
    ],
    ytd: 71
  },
  {
    id: 'tsr_total',
    name: 'TSR (Thermal Substitution Ratio)',
    category: 'energy',
    subcategory: 'Alternative Fuels',
    unit: '%',
    description: 'TSR',
    monthlyData: [
      { month: 'Apr', value: 8.19 }, { month: 'May', value: 9.24 }, { month: 'Jun', value: 10.09 },
      { month: 'Jul', value: 10.78 }, { month: 'Aug', value: 10.97 }, { month: 'Sep', value: 7.94 },
      { month: 'Oct', value: 11.13 }, { month: 'Nov', value: 10.43 }, { month: 'Dec', value: 11.27 },
      { month: 'Jan', value: 9.09 }, { month: 'Feb', value: 6.48 }
    ],
    ytd: 9
  },
  {
    id: 'ratio_electrical_green_energy',
    name: 'Ratio of Electrical Green Energy',
    category: 'energy',
    subcategory: 'Renewable Energy',
    unit: '%',
    description: 'Ratio of electrical green energy',
    monthlyData: [
      { month: 'Apr', value: 19.66 }, { month: 'May', value: 30.17 }, { month: 'Jun', value: 31.72 },
      { month: 'Jul', value: 29.05 }, { month: 'Aug', value: 18.87 }, { month: 'Sep', value: 27.10 },
      { month: 'Oct', value: 26.24 }, { month: 'Nov', value: 27.19 }, { month: 'Dec', value: 22.71 },
      { month: 'Jan', value: 24.06 }, { month: 'Feb', value: 21.21 }
    ],
    ytd: 25.39
  },
  {
    id: 'plant_load_factor',
    name: 'Plant Load Factor',
    category: 'energy',
    subcategory: 'Power Generation',
    unit: '%',
    description: 'Plant Load Factor',
    monthlyData: [
      { month: 'Apr', value: 82 }, { month: 'May', value: 65 }, { month: 'Jun', value: 75 },
      { month: 'Jul', value: 44 }, { month: 'Aug', value: 31 }, { month: 'Sep', value: 60 },
      { month: 'Oct', value: 71 }, { month: 'Nov', value: 76 }, { month: 'Dec', value: 72 },
      { month: 'Jan', value: 81 }, { month: 'Feb', value: 85 }
    ],
    ytd: 68
  },

  // EMISSIONS PARAMETERS
  {
    id: 'scope1_total',
    name: 'Scope 1 Total Emissions',
    category: 'emissions',
    subcategory: 'Scope-wise Emissions',
    unit: 'TCO2',
    description: 'Total Scope 1 emissions',
    monthlyData: [
      { month: 'Apr', value: 141462 }, { month: 'May', value: 160349 }, { month: 'Jun', value: 148511 },
      { month: 'Jul', value: 92690 }, { month: 'Aug', value: 59984 }, { month: 'Sep', value: 122600 },
      { month: 'Oct', value: 139258 }, { month: 'Nov', value: 150743 }, { month: 'Dec', value: 121793 },
      { month: 'Jan', value: 159463 }, { month: 'Feb', value: 144829 }
    ],
    ytd: 1441674
  },
  {
    id: 'emission_intensity_scope1',
    name: 'Emission Intensity - Scope 1',
    category: 'emissions',
    subcategory: 'Emission Intensity',
    unit: 'kg CO2/t cementitious',
    description: 'Emission intensity - Scope 1',
    monthlyData: [
      { month: 'Apr', value: 746 }, { month: 'May', value: 760 }, { month: 'Jun', value: 741 },
      { month: 'Jul', value: 713 }, { month: 'Aug', value: 664 }, { month: 'Sep', value: 756 },
      { month: 'Oct', value: 751 }, { month: 'Nov', value: 758 }, { month: 'Dec', value: 732 },
      { month: 'Jan', value: 749 }, { month: 'Feb', value: 745 }
    ],
    ytd: 742
  },
  {
    id: 'emission_intensity_scope2',
    name: 'Emission Intensity - Scope 2',
    category: 'emissions',
    subcategory: 'Emission Intensity',
    unit: 'kg CO2/t cementitious',
    description: 'Emission intensity - Scope 2',
    monthlyData: [
      { month: 'Apr', value: 5 }, { month: 'May', value: 6 }, { month: 'Jun', value: 3 },
      { month: 'Jul', value: 10 }, { month: 'Aug', value: 23 }, { month: 'Sep', value: 6 },
      { month: 'Oct', value: 4 }, { month: 'Nov', value: 4 }, { month: 'Dec', value: 5 },
      { month: 'Jan', value: 5 }, { month: 'Feb', value: 8 }
    ],
    ytd: 6
  },
  {
    id: 'emission_intensity_total',
    name: 'Total Emission Intensity',
    category: 'emissions',
    subcategory: 'Emission Intensity',
    unit: 'kg CO2/t cementitious',
    description: 'Total emission intensity',
    monthlyData: [
      { month: 'Apr', value: 754 }, { month: 'May', value: 769 }, { month: 'Jun', value: 747 },
      { month: 'Jul', value: 727 }, { month: 'Aug', value: 693 }, { month: 'Sep', value: 764 },
      { month: 'Oct', value: 757 }, { month: 'Nov', value: 764 }, { month: 'Dec', value: 741 },
      { month: 'Jan', value: 758 }, { month: 'Feb', value: 757 }
    ],
    ytd: 752
  }
];

// Monthly actual data for Facility 1 (Mattampally) - 2023-24
export const fac1MonthlyData = {
  production: [
    { month: 'Apr', clinkerProduction: 163252, cementProduction: 129975, blendedShare: 46 },
    { month: 'May', clinkerProduction: 190158, cementProduction: 102090, blendedShare: 46 },
    { month: 'Jun', clinkerProduction: 174611, cementProduction: 135932, blendedShare: 44 },
    { month: 'Jul', clinkerProduction: 108753, cementProduction: 108080, blendedShare: 46 },
    { month: 'Aug', clinkerProduction: 70042, cementProduction: 116550, blendedShare: 43 },
    { month: 'Sep', clinkerProduction: 143775, cementProduction: 90995, blendedShare: 51 },
    { month: 'Oct', clinkerProduction: 162306, cementProduction: 114870, blendedShare: 47 },
    { month: 'Nov', clinkerProduction: 175389, cementProduction: 119515, blendedShare: 47 },
    { month: 'Dec', clinkerProduction: 138981, cementProduction: 147355, blendedShare: 44 },
    { month: 'Jan', clinkerProduction: 185331, cementProduction: 141930, blendedShare: 46 },
    { month: 'Feb', clinkerProduction: 166483, cementProduction: 164510, blendedShare: 38 }
  ],
  energy: [
    { month: 'Apr', specificHeat: 725, specificPower: 69.80, tsr: 8.19, renewableRatio: 19.66 },
    { month: 'May', specificHeat: 711, specificPower: 63.96, tsr: 9.24, renewableRatio: 30.17 },
    { month: 'Jun', specificHeat: 703, specificPower: 69.62, tsr: 10.09, renewableRatio: 31.72 },
    { month: 'Jul', specificHeat: 703, specificPower: 75.88, tsr: 10.78, renewableRatio: 29.05 },
    { month: 'Aug', specificHeat: 704, specificPower: 89.80, tsr: 10.97, renewableRatio: 18.87 },
    { month: 'Sep', specificHeat: 705, specificPower: 68.50, tsr: 7.94, renewableRatio: 27.10 },
    { month: 'Oct', specificHeat: 708, specificPower: 68.55, tsr: 11.13, renewableRatio: 26.24 },
    { month: 'Nov', specificHeat: 710, specificPower: 67.11, tsr: 10.43, renewableRatio: 27.19 },
    { month: 'Dec', specificHeat: 713, specificPower: 75.31, tsr: 11.27, renewableRatio: 22.71 },
    { month: 'Jan', specificHeat: 708, specificPower: 68.93, tsr: 9.09, renewableRatio: 24.06 },
    { month: 'Feb', specificHeat: 723, specificPower: 74, tsr: 6.48, renewableRatio: 21.21 }
  ],
  emissions: [
    { month: 'Apr', scope1: 746, scope2: 5, scope3: 4, total: 754 },
    { month: 'May', scope1: 760, scope2: 6, scope3: 3, total: 769 },
    { month: 'Jun', scope1: 741, scope2: 3, scope3: 3, total: 747 },
    { month: 'Jul', scope1: 713, scope2: 10, scope3: 4, total: 727 },
    { month: 'Aug', scope1: 664, scope2: 23, scope3: 6, total: 693 },
    { month: 'Sep', scope1: 756, scope2: 6, scope3: 2, total: 764 },
    { month: 'Oct', scope1: 751, scope2: 4, scope3: 3, total: 757 },
    { month: 'Nov', scope1: 758, scope2: 4, scope3: 3, total: 764 },
    { month: 'Dec', scope1: 732, scope2: 5, scope3: 5, total: 741 },
    { month: 'Jan', scope1: 749, scope2: 5, scope3: 4, total: 758 },
    { month: 'Feb', scope1: 745, scope2: 8, scope3: 4, total: 757 }
  ],
  cementTypes: [
    { type: 'OPC', percentage: 55.3, production: 758545 },
    { type: 'PPC', percentage: 41.9, production: 574619 },
    { type: 'Super PPC', percentage: 2.8, production: 38638 },
    { type: 'Others', percentage: 0, production: 0 }
  ],
  powerSources: [
    { source: 'Grid', mwh: 16519, percentage: 12.0 },
    { source: 'Onsite CPP', mwh: 86098, percentage: 62.6 },
    { source: 'WHRS', mwh: 33722, percentage: 24.5 },
    { source: 'Solar', mwh: 1204, percentage: 0.9 }
  ]
};

// Facility configurations for data generation
const facilityConfigs = [
  { id: 'fac1', name: 'Mattampally', type: 'integrated' as const, capacity: '3.0 MTPA', performanceMultiplier: 1.0 },
  { id: 'fac2', name: 'Gudipadu', type: 'integrated' as const, capacity: '1.25 MTPA', performanceMultiplier: 1.05 },
  { id: 'fac3', name: 'Bayyavaram', type: 'grinding' as const, capacity: '1.5 MTPA', performanceMultiplier: 1.12 },
  { id: 'fac4', name: 'Jajpur', type: 'grinding' as const, capacity: '1.5 MTPA', performanceMultiplier: 1.15 },
  { id: 'fac5', name: 'Jeerabad', type: 'integrated' as const, capacity: '1.0 MTPA', performanceMultiplier: 0.95 },
  { id: 'fac6', name: 'Dachepalli', type: 'integrated' as const, capacity: '2.25 MTPA', performanceMultiplier: 1.08 }
];

// Generate comprehensive parameter registries for all facilities
export const facilityParameterRegistries: Record<string, Parameter[]> = {};
export const facilityCementTypes: Record<string, any[]> = {};
export const facilityPowerSources: Record<string, any[]> = {};
export const facilityMonthlyData: Record<string, any> = {};

facilityConfigs.forEach(config => {
  // Generate parameters for each facility
  facilityParameterRegistries[config.id] = generateFacilityParameters(config);
  
  // Get total cement production for calculations
  const cementParam = facilityParameterRegistries[config.id].find(p => p.id.includes('total_cement_produced'));
  const totalCementProduction = cementParam ? cementParam.ytd : 100000;
  
  // Generate cement types distribution
  facilityCementTypes[config.id] = generateCementTypes(config, totalCementProduction);
  
  // Generate power sources (assuming 100 MWh as base for grinding, 150 MWh for integrated)
  const basePower = config.type === 'integrated' ? 150000 : 50000;
  facilityPowerSources[config.id] = generatePowerSources(config, basePower);
  
  // Generate monthly overview data
  facilityMonthlyData[config.id] = {
    production: [
      { month: 'Apr', clinkerProduction: config.type === 'integrated' ? Math.round(163252 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)) : 0, 
        cementProduction: Math.round(129975 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)), blendedShare: 46 },
      { month: 'May', clinkerProduction: config.type === 'integrated' ? Math.round(190158 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)) : 0, 
        cementProduction: Math.round(102090 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)), blendedShare: 46 },
      { month: 'Jun', clinkerProduction: config.type === 'integrated' ? Math.round(174611 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)) : 0, 
        cementProduction: Math.round(135932 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)), blendedShare: 44 },
      { month: 'Jul', clinkerProduction: config.type === 'integrated' ? Math.round(108753 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)) : 0, 
        cementProduction: Math.round(108080 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)), blendedShare: 46 },
      { month: 'Aug', clinkerProduction: config.type === 'integrated' ? Math.round(70042 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)) : 0, 
        cementProduction: Math.round(116550 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)), blendedShare: 43 },
      { month: 'Sep', clinkerProduction: config.type === 'integrated' ? Math.round(143775 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)) : 0, 
        cementProduction: Math.round(90995 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)), blendedShare: 51 },
      { month: 'Oct', clinkerProduction: config.type === 'integrated' ? Math.round(162306 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)) : 0, 
        cementProduction: Math.round(114870 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)), blendedShare: 47 },
      { month: 'Nov', clinkerProduction: config.type === 'integrated' ? Math.round(175389 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)) : 0, 
        cementProduction: Math.round(119515 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)), blendedShare: 47 },
      { month: 'Dec', clinkerProduction: config.type === 'integrated' ? Math.round(138981 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)) : 0, 
        cementProduction: Math.round(147355 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)), blendedShare: 44 },
      { month: 'Jan', clinkerProduction: config.type === 'integrated' ? Math.round(185331 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)) : 0, 
        cementProduction: Math.round(141930 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)), blendedShare: 46 },
      { month: 'Feb', clinkerProduction: config.type === 'integrated' ? Math.round(166483 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)) : 0, 
        cementProduction: Math.round(164510 * (config.performanceMultiplier || 1) * (config.capacity === '3.0 MTPA' ? 1 : 0.5)), blendedShare: 38 }
    ],
    energy: [
      { month: 'Apr', specificHeat: config.type === 'integrated' ? 725 : 0, specificPower: 69.80, tsr: config.type === 'integrated' ? 8.19 : 0, renewableRatio: 19.66 },
      { month: 'May', specificHeat: config.type === 'integrated' ? 711 : 0, specificPower: 63.96, tsr: config.type === 'integrated' ? 9.24 : 0, renewableRatio: 30.17 },
      { month: 'Jun', specificHeat: config.type === 'integrated' ? 703 : 0, specificPower: 69.62, tsr: config.type === 'integrated' ? 10.09 : 0, renewableRatio: 31.72 },
      { month: 'Jul', specificHeat: config.type === 'integrated' ? 703 : 0, specificPower: 75.88, tsr: config.type === 'integrated' ? 10.78 : 0, renewableRatio: 29.05 },
      { month: 'Aug', specificHeat: config.type === 'integrated' ? 704 : 0, specificPower: 89.80, tsr: config.type === 'integrated' ? 10.97 : 0, renewableRatio: 18.87 },
      { month: 'Sep', specificHeat: config.type === 'integrated' ? 705 : 0, specificPower: 68.50, tsr: config.type === 'integrated' ? 7.94 : 0, renewableRatio: 27.10 },
      { month: 'Oct', specificHeat: config.type === 'integrated' ? 708 : 0, specificPower: 68.55, tsr: config.type === 'integrated' ? 11.13 : 0, renewableRatio: 26.24 },
      { month: 'Nov', specificHeat: config.type === 'integrated' ? 710 : 0, specificPower: 67.11, tsr: config.type === 'integrated' ? 10.43 : 0, renewableRatio: 27.19 },
      { month: 'Dec', specificHeat: config.type === 'integrated' ? 713 : 0, specificPower: 75.31, tsr: config.type === 'integrated' ? 11.27 : 0, renewableRatio: 22.71 },
      { month: 'Jan', specificHeat: config.type === 'integrated' ? 708 : 0, specificPower: 68.93, tsr: config.type === 'integrated' ? 9.09 : 0, renewableRatio: 24.06 },
      { month: 'Feb', specificHeat: config.type === 'integrated' ? 723 : 0, specificPower: 74, tsr: config.type === 'integrated' ? 6.48 : 0, renewableRatio: 21.21 }
    ],
    emissions: [
      { month: 'Apr', scope1: config.type === 'integrated' ? 746 : 65, scope2: 5, scope3: 4, total: config.type === 'integrated' ? 754 : 74 },
      { month: 'May', scope1: config.type === 'integrated' ? 760 : 68, scope2: 6, scope3: 3, total: config.type === 'integrated' ? 769 : 77 },
      { month: 'Jun', scope1: config.type === 'integrated' ? 741 : 62, scope2: 3, scope3: 3, total: config.type === 'integrated' ? 747 : 68 },
      { month: 'Jul', scope1: config.type === 'integrated' ? 713 : 58, scope2: 10, scope3: 4, total: config.type === 'integrated' ? 727 : 72 },
      { month: 'Aug', scope1: config.type === 'integrated' ? 664 : 55, scope2: 23, scope3: 6, total: config.type === 'integrated' ? 693 : 84 },
      { month: 'Sep', scope1: config.type === 'integrated' ? 756 : 64, scope2: 6, scope3: 2, total: config.type === 'integrated' ? 764 : 72 },
      { month: 'Oct', scope1: config.type === 'integrated' ? 751 : 63, scope2: 4, scope3: 3, total: config.type === 'integrated' ? 757 : 70 },
      { month: 'Nov', scope1: config.type === 'integrated' ? 758 : 66, scope2: 4, scope3: 3, total: config.type === 'integrated' ? 764 : 73 },
      { month: 'Dec', scope1: config.type === 'integrated' ? 732 : 61, scope2: 5, scope3: 5, total: config.type === 'integrated' ? 741 : 71 },
      { month: 'Jan', scope1: config.type === 'integrated' ? 749 : 65, scope2: 5, scope3: 4, total: config.type === 'integrated' ? 758 : 74 },
      { month: 'Feb', scope1: config.type === 'integrated' ? 745 : 63, scope2: 8, scope3: 4, total: config.type === 'integrated' ? 757 : 75 }
    ]
  };
});