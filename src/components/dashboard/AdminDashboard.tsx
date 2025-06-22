import React, { useState } from 'react';
import { mockFacilities, mockESGData } from '../../utils/mockData';
import { Building, TrendingUp, Users, MapPin, Calendar, Factory, Zap, Shield, Leaf } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  const totalFacilities = mockFacilities.length;
  const avgESGScore = Math.round(
    mockFacilities.reduce((acc, facility) => acc + facility.esgScore, 0) / totalFacilities
  );
  
  // Calculate total production capacity
  const totalCapacity = mockFacilities.reduce((sum, facility) => {
    return sum + parseFloat(facility.capacity.replace(' MTPA', ''));
  }, 0);

  // Calculate weighted average CO2 per ton (weighted by production capacity)
  const weightedAvgCO2 = Math.round(
    mockFacilities.reduce((acc, facility) => {
      const capacity = parseFloat(facility.capacity.replace(' MTPA', ''));
      const co2 = mockESGData[facility.id].environmental.co2PerTon;
      return acc + (co2 * capacity);
    }, 0) / totalCapacity
  );

  // Calculate average alternative fuel usage
  const avgAltFuelUsage = Math.round(
    mockFacilities.reduce((acc, facility) => {
      return acc + mockESGData[facility.id].environmental.altFuelUsage;
    }, 0) / totalFacilities
  );

  // Calculate group LTIFR (Lost Time Injury Frequency Rate)
  const totalEmployees = mockFacilities.reduce((acc, facility) => {
    return acc + mockESGData[facility.id].social.employees;
  }, 0);
  const weightedLTIFR = (
    mockFacilities.reduce((acc, facility) => {
      const employees = mockESGData[facility.id].social.employees;
      const ltifr = mockESGData[facility.id].social.ltifr;
      return acc + (ltifr * employees);
    }, 0) / totalEmployees
  ).toFixed(2);

  const chartData = mockFacilities.map(facility => ({
    name: facility.name,
    capacity: parseFloat(facility.capacity.replace(' MTPA', '')),
    co2PerTon: mockESGData[facility.id].environmental.co2PerTon,
    altFuel: mockESGData[facility.id].environmental.altFuelUsage
  }));

  const plantTypeData = [
    { name: 'Integrated Plants', value: mockFacilities.filter(f => f.type === 'integrated').length, color: '#074D47' },
    { name: 'Grinding Units', value: mockFacilities.filter(f => f.type === 'grinding').length, color: '#22867C' }
  ];

  const co2TrendData = [
    { month: 'Jan', avgCO2: 720, target: 650 },
    { month: 'Feb', avgCO2: 710, target: 650 },
    { month: 'Mar', avgCO2: 700, target: 650 },
    { month: 'Apr', avgCO2: 695, target: 650 },
    { month: 'May', avgCO2: 685, target: 650 },
    { month: 'Jun', avgCO2: weightedAvgCO2, target: 650 }
  ];

  const selectedFacilityData = selectedFacility ? mockFacilities.find(f => f.id === selectedFacility) : null;
  const selectedESGData = selectedFacility ? mockESGData[selectedFacility] : null;

  return (
    <div className="space-y-grid-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-grid-3">
        <div>
          <h1 className="text-2xl font-semibold text-latspace-dark">Sagar Cements Limited - Group Dashboard</h1>
          <p className="text-sm text-latspace-medium mt-1">ESG Performance Management System</p>
        </div>
        <div className="text-sm text-latspace-medium font-mono">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-grid-3">
        <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
          <div className="flex items-center">
            <Factory className="w-6 h-6 text-latspace-dark" />
            <div className="ml-grid-2">
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Total Capacity</p>
              <p className="text-xl font-mono text-latspace-dark data-value">{totalCapacity} MTPA</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
          <div className="flex items-center">
            <Leaf className="w-6 h-6 text-latspace-dark" />
            <div className="ml-grid-2">
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Avg CO2/ton</p>
              <p className="text-xl font-mono text-latspace-dark data-value">{weightedAvgCO2} kg</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
          <div className="flex items-center">
            <Zap className="w-6 h-6 text-latspace-dark" />
            <div className="ml-grid-2">
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Alt Fuel Rate</p>
              <p className="text-xl font-mono text-latspace-dark data-value">{avgAltFuelUsage}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-latspace-dark" />
            <div className="ml-grid-2">
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Group LTIFR</p>
              <p className="text-xl font-mono text-latspace-dark data-value">{weightedLTIFR}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-latspace-dark" />
            <div className="ml-grid-2">
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">ESG Score</p>
              <p className="text-xl font-mono text-latspace-dark data-value">{avgESGScore}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid-3">
        <div className="bg-white border border-gray-200 p-grid-4">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">CO2 Emissions by Facility</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="co2PerTon" fill="#074D47" name="CO2 kg/ton" />
              <Bar dataKey="altFuel" fill="#22867C" name="Alt Fuel %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 p-grid-4">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">CO2 Reduction Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={co2TrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avgCO2" stroke="#074D47" name="Avg CO2" strokeWidth={2} />
              <Line type="monotone" dataKey="target" stroke="#89E4DA" name="Target" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid-3">
        <div className="bg-white border border-gray-200 p-grid-4">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Production Capacity by Facility</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="capacity" fill="#074D47" name="Capacity (MTPA)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 p-grid-4">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Plant Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={plantTypeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {plantTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-gray-200">
        <div className="px-grid-4 py-grid-3 border-b border-gray-200">
          <h3 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">Facility Overview - Click to View Details</h3>
        </div>
        <div className="p-grid-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-grid-2 mb-grid-4">
            {mockFacilities.map((facility) => (
              <div
                key={facility.id}
                className={`p-grid-3 border cursor-pointer transition-colors ${
                  selectedFacility === facility.id
                    ? 'border-latspace-dark bg-gray-50'
                    : 'border-gray-200 hover:border-latspace-medium'
                }`}
                onClick={() => setSelectedFacility(
                  selectedFacility === facility.id ? null : facility.id
                )}
              >
                <div className="flex items-center justify-between mb-grid">
                  <h4 className="font-semibold text-latspace-dark">{facility.name}</h4>
                  <div className="px-grid py-1 text-xs font-mono border border-latspace-dark text-latspace-dark data-value">
                    {facility.esgScore}
                  </div>
                </div>
                <div className="flex items-center text-xs text-latspace-medium mb-grid font-mono">
                  <MapPin className="w-3 h-3 mr-1" />
                  {facility.location}
                </div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Capacity</span>
                  <span className="text-latspace-dark font-mono data-value">{facility.capacity}</span>
                </div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Type</span>
                  <span className="text-latspace-dark font-mono data-value uppercase">{facility.type}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-latspace-medium uppercase tracking-wider">CO2/ton</span>
                  <span className="text-latspace-dark font-mono data-value">{mockESGData[facility.id].environmental.co2PerTon} kg</span>
                </div>
              </div>
            ))}
          </div>

          {selectedFacilityData && selectedESGData && (
            <div className="border-t border-gray-200 pt-grid-4">
              <h4 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">
                {selectedFacilityData.name} - Detailed Cement Manufacturing Metrics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-3">
                <div className="border border-gray-200 p-grid-3 grid-pattern">
                  <h5 className="font-semibold text-latspace-dark mb-grid-2 text-sm uppercase tracking-wider">Environmental</h5>
                  <div className="space-y-grid text-xs">
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">CO2/ton cement</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.environmental.co2PerTon} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">Thermal Energy</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.environmental.thermalEnergy} kcal/kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">Electrical Energy</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.environmental.electricalEnergy} kWh/ton</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">Alt Fuel Usage</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.environmental.altFuelUsage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">Clinker Factor</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.environmental.clinkerFactor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">Water/ton</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.environmental.waterPerTon} L</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 p-grid-3 grid-pattern">
                  <h5 className="font-semibold text-latspace-dark mb-grid-2 text-sm uppercase tracking-wider">Social</h5>
                  <div className="space-y-grid text-xs">
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">Employees</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.social.employees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">LTIFR</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.social.ltifr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">Training Hours</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.social.trainingHours} hrs/emp</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">Local Employment</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.social.localEmployment}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">CSR Spend</span>
                      <span className="font-mono text-latspace-dark data-value">₹{selectedESGData.social.csrSpend}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">Contractor LTIFR</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.social.contractorSafety}</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 p-grid-3 grid-pattern">
                  <h5 className="font-semibold text-latspace-dark mb-grid-2 text-sm uppercase tracking-wider">Governance</h5>
                  <div className="space-y-grid text-xs">
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">ISO 14001</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.governance.iso14001 ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">ISO 45001</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.governance.iso45001 ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">Sustainability Report</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.governance.sustainabilityReporting ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">Board Independence</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.governance.boardIndependence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-latspace-medium">Ethics Training</span>
                      <span className="font-mono text-latspace-dark data-value">{selectedESGData.governance.ethicsTraining}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};