import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { 
  mockFacilities, 
  mockESGData, 
  facilityParameterRegistries,
  facilityCementTypes,
  facilityPowerSources,
  facilityMonthlyData,
  Parameter
} from '../utils/mockData';
import { 
  Building, MapPin, User, TrendingUp, ArrowLeft, Calendar, 
  Leaf, Download, FileText, Activity, Factory, 
  Zap, Target
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, PieChart as RechartsPieChart, Pie, Cell
} from 'recharts';
import { ParameterSearch } from '../components/dashboard/ParameterSearch';
import { ParameterChart } from '../components/dashboard/ParameterChart';

export const FacilityDetail: React.FC = () => {
  const { facilityId } = useParams<{ facilityId: string }>();
  const navigate = useNavigate();
  const [selectedParameter, setSelectedParameter] = useState<Parameter | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'production' | 'energy' | 'emissions'>('overview');
  
  const facility = mockFacilities.find(f => f.id === facilityId);
  const esgData = facilityId ? mockESGData[facilityId] : null;
  const parameters = facilityId ? facilityParameterRegistries[facilityId] || [] : [];
  const cementTypes = facilityId ? facilityCementTypes[facilityId] || [] : [];
  const powerSources = facilityId ? facilityPowerSources[facilityId] || [] : [];
  const monthlyData = facilityId ? facilityMonthlyData[facilityId] : null;

  if (!facility || !esgData) {
    return (
      <Layout>
        <div className="text-center py-grid-10 border border-gray-200 bg-white">
          <Building className="w-grid-6 h-grid-6 text-latspace-medium mx-auto mb-grid-3" />
          <p className="text-latspace-medium font-mono uppercase text-sm mb-grid-3">Facility not found</p>
          <button
            onClick={() => navigate('/admin/facilities')}
            className="px-grid-3 py-grid-2 border border-latspace-dark text-latspace-dark hover:bg-latspace-dark hover:text-white transition-colors uppercase text-xs font-semibold tracking-wider"
          >
            Back to Facilities
          </button>
        </div>
      </Layout>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-latspace-dark';
    if (score >= 70) return 'text-latspace-medium';
    return 'text-latspace-light';
  };

  // Get key metrics from parameters
  const getParameterValue = (id: string) => {
    const param = parameters.find(p => p.id.includes(id));
    return param ? param.ytd : 0;
  };

  const keyMetrics = {
    clinkerProduction: getParameterValue('clinker_production'),
    cementProduction: getParameterValue('total_cement_produced'),
    specificHeatConsumption: getParameterValue('specific_heat_consumption'),
    specificPowerConsumption: getParameterValue('specific_power_consumption_cementitious'),
    tsrTotal: getParameterValue('tsr_total'),
    renewableEnergyRatio: getParameterValue('ratio_electrical_green_energy'),
    scope1Emissions: getParameterValue('scope1_total'),
    emissionIntensity: getParameterValue('emission_intensity_total'),
    plantLoadFactor: getParameterValue('plant_load_factor')
  };

  // Prepare radar chart data
  const radarData = [
    { metric: 'CO2 Efficiency', value: Math.max(0, 100 - (esgData.environmental.co2PerTon - 600) / 2), fullMark: 100 },
    { metric: 'Energy Efficiency', value: Math.max(0, 100 - (esgData.environmental.electricalEnergy - 50) / 0.5), fullMark: 100 },
    { metric: 'Alt Fuel Usage', value: esgData.environmental.altFuelUsage, fullMark: 100 },
    { metric: 'Water Efficiency', value: Math.max(0, 100 - (esgData.environmental.waterPerTon - 50)), fullMark: 100 },
    { metric: 'Safety (LTIFR)', value: Math.max(0, 100 - esgData.social.ltifr * 50), fullMark: 100 },
    { metric: 'Local Employment', value: esgData.social.localEmployment, fullMark: 100 }
  ];

  // Colors for charts
  const COLORS = ['#074D47', '#22867C', '#89E4DA', '#3B82F6', '#10B981', '#EF4444'];

  return (
    <Layout>
      <div className="space-y-grid-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 p-grid-4">
          <button
            onClick={() => navigate('/admin/facilities')}
            className="flex items-center text-latspace-medium hover:text-latspace-dark mb-grid-3 text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 mr-grid" />
            Back to Facilities
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-latspace-dark uppercase tracking-wide mb-grid-2">
                {facility.name} Cement Plant - Operational Dashboard
              </h1>
              <div className="space-y-grid">
                <div className="flex items-center text-xs text-latspace-medium font-mono">
                  <MapPin className="w-3 h-3 mr-1" />
                  {facility.location}
                </div>
                <div className="flex items-center text-xs text-latspace-medium">
                  <Factory className="w-3 h-3 mr-1" />
                  <span className="uppercase tracking-wider">Capacity:</span>
                  <span className="ml-1 font-mono">{facility.capacity} • {facility.type.toUpperCase()} PLANT</span>
                </div>
                {facility.company && (
                  <div className="text-xs text-latspace-medium font-mono italic">
                    {facility.company}
                  </div>
                )}
                <div className="flex items-center text-xs text-latspace-medium">
                  <User className="w-3 h-3 mr-1" />
                  <span className="uppercase tracking-wider">Plant Head:</span>
                  <span className="ml-1 font-mono">{facility.manager}</span>
                </div>
                <div className="flex items-center text-xs text-latspace-medium">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span className="uppercase tracking-wider">Updated:</span>
                  <span className="ml-1 font-mono">{new Date(facility.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-3xl font-mono ${getScoreColor(facility.esgScore)} data-value`}>
                {facility.esgScore}
              </div>
              <div className="text-xs font-semibold text-latspace-medium uppercase tracking-wider mt-grid">ESG Score</div>
              <div className={`mt-grid-2 px-grid-2 py-grid border text-xs font-mono ${getScoreColor(facility.esgScore)} border-current`}>
                {facility.esgScore >= 90 ? 'EXCELLENT' : facility.esgScore >= 70 ? 'GOOD' : 'NEEDS IMPROVEMENT'}
              </div>
            </div>
          </div>
        </div>

        {/* Parameter Search */}
        <ParameterSearch
          selectedParameter={selectedParameter}
          onParameterSelect={setSelectedParameter}
          parameters={parameters}
        />

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-grid-3">
          <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
            <div className="flex items-center">
              <Factory className="w-6 h-6 text-blue-600" />
              <div className="ml-grid-2">
                <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">
                  {facility.type === 'integrated' ? 'Clinker Production' : 'Cement Production'}
                </p>
                <p className="text-xl font-mono text-latspace-dark data-value">
                  {facility.type === 'integrated' 
                    ? `${(keyMetrics.clinkerProduction / 1000).toFixed(0)}K Tons`
                    : `${(keyMetrics.cementProduction / 1000).toFixed(0)}K Tons`
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
            <div className="flex items-center">
              <Zap className="w-6 h-6 text-green-600" />
              <div className="ml-grid-2">
                <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Power Consumption</p>
                <p className="text-xl font-mono text-latspace-dark data-value">{keyMetrics.specificPowerConsumption} kWh/t</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
            <div className="flex items-center">
              <Leaf className="w-6 h-6 text-red-600" />
              <div className="ml-grid-2">
                <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Emission Intensity</p>
                <p className="text-xl font-mono text-latspace-dark data-value">{keyMetrics.emissionIntensity} kg CO2/t</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
            <div className="flex items-center">
              <Target className="w-6 h-6 text-latspace-dark" />
              <div className="ml-grid-2">
                <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">
                  {facility.type === 'integrated' ? 'Alt Fuel Usage' : 'Renewable Energy'}
                </p>
                <p className="text-xl font-mono text-latspace-dark data-value">
                  {facility.type === 'integrated' ? `${keyMetrics.tsrTotal}%` : `${keyMetrics.renewableEnergyRatio}%`}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
            <div className="flex items-center">
              <Activity className="w-6 h-6 text-latspace-dark" />
              <div className="ml-grid-2">
                <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Data Completion</p>
                <p className="text-xl font-mono text-latspace-dark data-value">{facility.dataCompleteness}%</p>
              </div>
            </div>
            <div className="mt-grid-2 w-full bg-gray-200 h-2">
              <div
                className="h-2 bg-latspace-dark"
                style={{ width: `${facility.dataCompleteness}%` }}
              />
            </div>
          </div>
        </div>

        {/* Parameter-specific chart or tabbed dashboard */}
        {selectedParameter ? (
          <ParameterChart parameter={selectedParameter} />
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="flex space-x-1 border-b border-gray-200">
              {[
                { id: 'overview', label: 'Overview', icon: Activity },
                { id: 'production', label: 'Production', icon: Factory },
                { id: 'energy', label: 'Energy', icon: Zap },
                { id: 'emissions', label: 'Emissions', icon: Leaf }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-grid-4 py-grid-2 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-latspace-dark text-latspace-dark'
                        : 'border-transparent text-latspace-medium hover:text-latspace-dark'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-mono text-sm uppercase tracking-wider">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid-3">
                {/* Production Trends */}
                <div className="bg-white border border-gray-200 p-grid-4">
                  <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">
                    {facility.type === 'integrated' ? 'Production Trends (11 Months)' : 'Cement Production Trends (11 Months)'}
                  </h3>
                  {monthlyData && (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyData.production}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        {facility.type === 'integrated' && (
                          <Line 
                            type="monotone" 
                            dataKey="clinkerProduction" 
                            stroke="#074D47" 
                            name="Clinker Production" 
                            strokeWidth={2} 
                          />
                        )}
                        <Line 
                          type="monotone" 
                          dataKey="cementProduction" 
                          stroke="#22867C" 
                          name="Cement Production" 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Performance Radar */}
                <div className="bg-white border border-gray-200 p-grid-4">
                  <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">
                    Plant Performance Overview
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Performance" dataKey="value" stroke="#074D47" fill="#074D47" fillOpacity={0.3} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Cement Types Distribution */}
                <div className="bg-white border border-gray-200 p-grid-4">
                  <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">
                    Cement Types Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={cementTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="percentage"
                        label={({ type, percentage }) => `${type}: ${percentage}%`}
                      >
                        {cementTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>

                {/* Power Sources */}
                <div className="bg-white border border-gray-200 p-grid-4">
                  <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">
                    Power Sources Breakdown
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={powerSources}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="source" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`${value}%`, 'Percentage']} />
                      <Bar dataKey="percentage" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'production' && (
              <div className="bg-white border border-gray-200 p-grid-4">
                <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">
                  Production Parameters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-3">
                  {parameters.filter(p => p.category === 'production').map(param => (
                    <div
                      key={param.id}
                      className="p-grid-3 border border-gray-200 hover:border-blue-400 cursor-pointer transition-colors"
                      onClick={() => setSelectedParameter(param)}
                    >
                      <h4 className="font-semibold text-latspace-dark text-sm mb-1">{param.name}</h4>
                      <p className="text-xs text-latspace-medium mb-2">{param.subcategory}</p>
                      <p className="text-lg font-mono text-blue-600 data-value">
                        {param.ytd.toLocaleString()} {param.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'energy' && (
              <div className="bg-white border border-gray-200 p-grid-4">
                <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">
                  Energy Parameters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-3">
                  {parameters.filter(p => p.category === 'energy').map(param => (
                    <div
                      key={param.id}
                      className="p-grid-3 border border-gray-200 hover:border-green-400 cursor-pointer transition-colors"
                      onClick={() => setSelectedParameter(param)}
                    >
                      <h4 className="font-semibold text-latspace-dark text-sm mb-1">{param.name}</h4>
                      <p className="text-xs text-latspace-medium mb-2">{param.subcategory}</p>
                      <p className="text-lg font-mono text-green-600 data-value">
                        {param.ytd.toLocaleString()} {param.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'emissions' && (
              <div className="bg-white border border-gray-200 p-grid-4">
                <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">
                  Emissions Parameters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-3">
                  {parameters.filter(p => p.category === 'emissions').map(param => (
                    <div
                      key={param.id}
                      className="p-grid-3 border border-gray-200 hover:border-red-400 cursor-pointer transition-colors"
                      onClick={() => setSelectedParameter(param)}
                    >
                      <h4 className="font-semibold text-latspace-dark text-sm mb-1">{param.name}</h4>
                      <p className="text-xs text-latspace-medium mb-2">{param.subcategory}</p>
                      <p className="text-lg font-mono text-red-600 data-value">
                        {param.ytd.toLocaleString()} {param.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Actions */}
        <div className="bg-white border border-gray-200 p-grid-4">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Actions</h3>
          <div className="flex flex-wrap gap-grid-2">
            <button className="flex items-center px-grid-3 py-grid-2 bg-latspace-dark text-white hover:bg-latspace-medium transition-colors uppercase text-xs font-semibold tracking-wider">
              <Download className="w-4 h-4 mr-grid" />
              Export Report
            </button>
            <button className="flex items-center px-grid-3 py-grid-2 border border-latspace-dark text-latspace-dark hover:bg-latspace-dark hover:text-white transition-colors uppercase text-xs font-semibold tracking-wider">
              <FileText className="w-4 h-4 mr-grid" />
              View Documents
            </button>
            <button className="flex items-center px-grid-3 py-grid-2 border border-latspace-dark text-latspace-dark hover:bg-latspace-dark hover:text-white transition-colors uppercase text-xs font-semibold tracking-wider">
              <TrendingUp className="w-4 h-4 mr-grid" />
              Set Targets
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};