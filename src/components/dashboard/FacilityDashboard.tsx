import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockFacilities, mockESGData, fac1MonthlyData } from '../../utils/mockData';
import { ProgressBar } from './ProgressBar';
import { Leaf, Zap, Droplets, Factory, Users, Shield, Heart, Scale, CheckCircle, FileText, Upload, Flame, Gauge } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const FacilityDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const facility = mockFacilities.find(f => f.id === user?.facilityId);
  const esgData = user?.facilityId ? mockESGData[user.facilityId] : null;

  if (!facility || !esgData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Facility data not found</p>
      </div>
    );
  }

  const environmentalMetrics = [
    { icon: Leaf, label: 'CO2 per ton', value: esgData.environmental.co2PerTon, unit: 'kg/ton' },
    { icon: Flame, label: 'Thermal Energy', value: esgData.environmental.thermalEnergy, unit: 'kcal/kg' },
    { icon: Zap, label: 'Electrical Energy', value: esgData.environmental.electricalEnergy, unit: 'kWh/ton' },
    { icon: Factory, label: 'Alternative Fuel', value: esgData.environmental.altFuelUsage, unit: '%' },
    { icon: Gauge, label: 'Clinker Factor', value: esgData.environmental.clinkerFactor, unit: '' },
    { icon: Droplets, label: 'Water per ton', value: esgData.environmental.waterPerTon, unit: 'L/ton' }
  ];

  const socialMetrics = [
    { icon: Users, label: 'Total Employees', value: esgData.social.employees, unit: '' },
    { icon: Shield, label: 'LTIFR', value: esgData.social.ltifr, unit: '' },
    { icon: Scale, label: 'Training Hours', value: esgData.social.trainingHours, unit: 'hrs/emp' },
    { icon: Heart, label: 'Local Employment', value: esgData.social.localEmployment, unit: '%' },
    { icon: Users, label: 'CSR Spend', value: esgData.social.csrSpend, unit: '₹M' },
    { icon: Shield, label: 'Contractor LTIFR', value: esgData.social.contractorSafety, unit: '' }
  ];

  const governanceMetrics = [
    { label: 'ISO 14001', value: esgData.governance.iso14001 ? 'Certified' : 'Not Certified', unit: '' },
    { label: 'ISO 45001', value: esgData.governance.iso45001 ? 'Certified' : 'Not Certified', unit: '' },
    { label: 'Sustainability Reporting', value: esgData.governance.sustainabilityReporting ? 'Yes' : 'No', unit: '' },
    { label: 'Board Independence', value: esgData.governance.boardIndependence, unit: '%' },
    { label: 'Ethics Training', value: esgData.governance.ethicsTraining, unit: '%' }
  ];

  const monthlyTrend = user?.facilityId === 'fac1' ? 
    fac1MonthlyData.emissions.map(item => ({
      month: item.month,
      co2: item.total,
      altFuel: fac1MonthlyData.energy.find(e => e.month === item.month)?.tsr || 0
    })) : [
      { month: 'Jan', co2: 720, altFuel: 15 },
      { month: 'Feb', co2: 710, altFuel: 16 },
      { month: 'Mar', co2: 700, altFuel: 18 },
      { month: 'Apr', co2: 695, altFuel: 19 },
      { month: 'May', co2: 685, altFuel: 20 },
      { month: 'Jun', co2: esgData.environmental.co2PerTon, altFuel: esgData.environmental.altFuelUsage }
    ];

  const radarData = [
    { subject: 'CO2 Efficiency', A: Math.max(0, 100 - (esgData.environmental.co2PerTon - 600) / 2), fullMark: 100 },
    { subject: 'Energy Efficiency', A: Math.max(0, 100 - (esgData.environmental.electricalEnergy - 50) / 0.5), fullMark: 100 },
    { subject: 'Alt Fuel Usage', A: esgData.environmental.altFuelUsage, fullMark: 100 },
    { subject: 'Water Efficiency', A: Math.max(0, 100 - (esgData.environmental.waterPerTon - 50)), fullMark: 100 },
    { subject: 'Safety (LTIFR)', A: Math.max(0, 100 - esgData.social.ltifr * 50), fullMark: 100 },
    { subject: 'Local Employment', A: esgData.social.localEmployment, fullMark: 100 }
  ];

  const emissionsData = [
    { type: 'Dust', value: esgData.environmental.dustEmissions, limit: 30 },
    { type: 'NOx', value: esgData.environmental.noxEmissions, limit: 200 },
    { type: 'SOx', value: esgData.environmental.soxEmissions, limit: 50 }
  ];

  const recentActivities = [
    { id: 1, type: 'upload', description: 'Uploaded energy consumption report', time: '2 hours ago', icon: Upload },
    { id: 2, type: 'entry', description: 'Updated safety metrics', time: '1 day ago', icon: FileText },
    { id: 3, type: 'complete', description: 'Completed Q2 ESG assessment', time: '3 days ago', icon: CheckCircle }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-grid-3">
        <div>
          <h1 className="text-2xl font-semibold text-latspace-dark">{facility.name} Cement Plant</h1>
          <p className="text-sm text-latspace-medium font-mono">{facility.location} • {facility.capacity} • {facility.type.toUpperCase()} PLANT</p>
          <p className="text-sm text-latspace-medium font-mono mt-1">Plant Head: {facility.manager}</p>
          {facility.company && <p className="text-sm text-latspace-medium font-mono italic">{facility.company}</p>}
        </div>
        <div className="text-right">
          <div className="text-3xl font-mono text-latspace-dark data-value">{facility.dataCompleteness}%</div>
          <div className="text-xs text-latspace-medium uppercase tracking-wider">Data Completeness</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid-3">
        <div className="lg:col-span-2">
          <ProgressBar 
            percentage={facility.dataCompleteness} 
            label="Data Collection Progress"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid-3">
        <div className="bg-white border border-gray-200 p-grid-4">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">CO2 & Alternative Fuel Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="co2" stroke="#074D47" strokeWidth={2} name="CO2 kg/ton" />
              <Line yAxisId="right" type="monotone" dataKey="altFuel" stroke="#22867C" strokeWidth={2} name="Alt Fuel %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 p-grid-4">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Cement Plant Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Performance" dataKey="A" stroke="#074D47" fill="#074D47" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-grid-4">
        <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Emissions vs Limits (mg/Nm³)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={emissionsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#074D47" name="Actual" />
            <Bar dataKey="limit" fill="#89E4DA" name="Limit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {user?.facilityId === 'fac1' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid-3">
            <div className="bg-white border border-gray-200 p-grid-4">
              <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Monthly Production Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fac1MonthlyData.production}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
                  <Line type="monotone" dataKey="clinkerProduction" stroke="#074D47" strokeWidth={2} name="Clinker (tons)" />
                  <Line type="monotone" dataKey="cementProduction" stroke="#22867C" strokeWidth={2} name="Cement (tons)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-gray-200 p-grid-4">
              <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Cement Type Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={fac1MonthlyData.cementTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percentage }) => `${type}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {fac1MonthlyData.cementTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#074D47', '#22867C', '#89E4DA', '#E6F7F5'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid-3">
            <div className="bg-white border border-gray-200 p-grid-4">
              <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Energy Metrics Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fac1MonthlyData.energy}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="specificHeat" stroke="#074D47" strokeWidth={2} name="Heat (kcal/kg)" />
                  <Line yAxisId="right" type="monotone" dataKey="renewableRatio" stroke="#22867C" strokeWidth={2} name="Renewable %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-gray-200 p-grid-4">
              <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Power Sources</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fac1MonthlyData.powerSources}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'MWh']} />
                  <Bar dataKey="mwh" fill="#074D47" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid-3">
        <div className="bg-white border border-gray-200 p-grid-4">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 flex items-center uppercase tracking-wide">
            <Leaf className="w-4 h-4 text-latspace-dark mr-grid" />
            Environmental Performance
          </h3>
          <div className="space-y-2">
            {environmentalMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 grid-pattern">
                  <div className="flex items-center min-w-0">
                    <Icon className="w-4 h-4 text-latspace-dark mr-2 flex-shrink-0" />
                    <span className="text-xs font-medium text-latspace-medium truncate">{metric.label}</span>
                  </div>
                  <span className="text-xs font-mono text-latspace-dark data-value whitespace-nowrap ml-2">
                    {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value} {metric.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-grid-4">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 flex items-center uppercase tracking-wide">
            <Users className="w-4 h-4 text-latspace-dark mr-grid" />
            Social Performance
          </h3>
          <div className="space-y-2">
            {socialMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 grid-pattern">
                  <div className="flex items-center min-w-0">
                    <Icon className="w-4 h-4 text-latspace-dark mr-2 flex-shrink-0" />
                    <span className="text-xs font-medium text-latspace-medium truncate">{metric.label}</span>
                  </div>
                  <span className="text-xs font-mono text-latspace-dark data-value whitespace-nowrap ml-2">
                    {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value} {metric.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-grid-4">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 flex items-center uppercase tracking-wide">
            <Scale className="w-4 h-4 text-latspace-dark mr-grid" />
            Governance & Compliance
          </h3>
          <div className="space-y-2">
            {governanceMetrics.map((metric, index) => {
              const isPercentage = metric.unit === '%';
              return (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 grid-pattern">
                  <span className="text-xs font-medium text-latspace-medium min-w-0 truncate">{metric.label}</span>
                  {isPercentage ? (
                    <div className="flex items-center ml-2">
                      <div className="w-24 bg-gray-200 h-1 mr-2">
                        <div
                          className="bg-latspace-dark h-1"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-latspace-dark data-value whitespace-nowrap">{metric.value}%</span>
                    </div>
                  ) : (
                    <span className="text-xs font-mono text-latspace-dark data-value whitespace-nowrap ml-2">{metric.value}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-grid-4">
        <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Recent Activity</h3>
        <div className="space-y-grid-2">
          {recentActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-center p-grid-2 border border-gray-200">
                <Icon className="w-4 h-4 text-latspace-medium mr-grid-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-latspace-dark">{activity.description}</p>
                  <p className="text-xs text-latspace-medium font-mono">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};