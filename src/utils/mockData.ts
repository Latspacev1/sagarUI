import { User, Facility, ESGData } from '../types';

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
  fac1: { // Mattampally - Largest integrated plant
    environmental: {
      co2PerTon: 680,
      thermalEnergy: 720,
      electricalEnergy: 78,
      altFuelUsage: 22,
      clinkerFactor: 0.82,
      waterPerTon: 120,
      dustEmissions: 28,
      noxEmissions: 180,
      soxEmissions: 45,
      wasteHeatRecovery: 12,
      greenCover: 145
    },
    social: {
      employees: 450,
      ltifr: 0.8,
      trainingHours: 24,
      localEmployment: 78,
      csrSpend: 8.5,
      contractorSafety: 1.2
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