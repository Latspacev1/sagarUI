export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'facility_head';
  facilityId?: string;
  name: string;
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  capacity: string; // e.g., "3.0 MTPA"
  type: 'integrated' | 'grinding';
  company?: string; // For subsidiaries
  dataCompleteness: number;
  manager: string;
  lastUpdated: string;
}

export interface ESGData {
  environmental: {
    co2PerTon: number; // kg CO2/ton cement
    thermalEnergy: number; // kcal/kg clinker
    electricalEnergy: number; // kWh/ton cement
    altFuelUsage: number; // % alternative fuel usage
    clinkerFactor: number; // clinker/cement ratio
    waterPerTon: number; // liters/ton cement
    dustEmissions: number; // mg/Nm3
    noxEmissions: number; // mg/Nm3
    soxEmissions: number; // mg/Nm3
    wasteHeatRecovery: number; // MW
    greenCover: number; // hectares
  };
  social: {
    employees: number;
    ltifr: number; // Lost Time Injury Frequency Rate
    trainingHours: number; // per employee per year
    localEmployment: number; // % local employment
    csrSpend: number; // INR in millions
    contractorSafety: number; // contractor LTIFR
  };
  governance: {
    iso14001: boolean; // Environmental Management System
    iso45001: boolean; // Occupational Health & Safety
    sustainabilityReporting: boolean;
    boardIndependence: number; // % independent directors
    ethicsTraining: number; // % employees trained
  };
}

export interface DashboardMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}