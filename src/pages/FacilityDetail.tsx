import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { mockFacilities, mockESGData } from '../utils/mockData';
import { 
  Building, MapPin, User, TrendingUp, ArrowLeft, Calendar, 
  Leaf, Users, Shield, Download, FileText, Activity, Factory, Zap, Flame, Gauge
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export const FacilityDetail: React.FC = () => {
  const { facilityId } = useParams<{ facilityId: string }>();
  const navigate = useNavigate();
  
  const facility = mockFacilities.find(f => f.id === facilityId);
  const esgData = facilityId ? mockESGData[facilityId] : null;

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

  // Prepare data for charts
  const monthlyData = [
    { month: 'Jan', co2: 720, altFuel: 15, clinkerFactor: 0.85 },
    { month: 'Feb', co2: 710, altFuel: 16, clinkerFactor: 0.84 },
    { month: 'Mar', co2: 700, altFuel: 18, clinkerFactor: 0.83 },
    { month: 'Apr', co2: 695, altFuel: 19, clinkerFactor: 0.82 },
    { month: 'May', co2: 685, altFuel: 20, clinkerFactor: 0.81 },
    { month: 'Jun', co2: esgData.environmental.co2PerTon, altFuel: esgData.environmental.altFuelUsage, clinkerFactor: esgData.environmental.clinkerFactor }
  ];

  const radarData = [
    { metric: 'CO2 Efficiency', value: Math.max(0, 100 - (esgData.environmental.co2PerTon - 600) / 2), fullMark: 100 },
    { metric: 'Energy Efficiency', value: Math.max(0, 100 - (esgData.environmental.electricalEnergy - 50) / 0.5), fullMark: 100 },
    { metric: 'Alt Fuel Usage', value: esgData.environmental.altFuelUsage, fullMark: 100 },
    { metric: 'Water Efficiency', value: Math.max(0, 100 - (esgData.environmental.waterPerTon - 50)), fullMark: 100 },
    { metric: 'Safety (LTIFR)', value: Math.max(0, 100 - esgData.social.ltifr * 50), fullMark: 100 },
    { metric: 'Local Employment', value: esgData.social.localEmployment, fullMark: 100 }
  ];

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
              <h1 className="text-2xl font-semibold text-latspace-dark uppercase tracking-wide mb-grid-2">{facility.name} Cement Plant</h1>
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-grid-3">
          <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
            <div className="flex items-center">
              <Factory className="w-6 h-6 text-latspace-dark" />
              <div className="ml-grid-2">
                <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Capacity</p>
                <p className="text-xl font-mono text-latspace-dark data-value">{facility.capacity}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
            <div className="flex items-center">
              <Leaf className="w-6 h-6 text-latspace-dark" />
              <div className="ml-grid-2">
                <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">CO2/ton</p>
                <p className="text-xl font-mono text-latspace-dark data-value">{esgData.environmental.co2PerTon} kg</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
            <div className="flex items-center">
              <Zap className="w-6 h-6 text-latspace-dark" />
              <div className="ml-grid-2">
                <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Alt Fuel</p>
                <p className="text-xl font-mono text-latspace-dark data-value">{esgData.environmental.altFuelUsage}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-latspace-dark" />
              <div className="ml-grid-2">
                <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">LTIFR</p>
                <p className="text-xl font-mono text-latspace-dark data-value">{esgData.social.ltifr}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
            <div className="flex items-center">
              <Activity className="w-6 h-6 text-latspace-dark" />
              <div className="ml-grid-2">
                <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Completion</p>
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

        {/* ESG Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid-3">
          <div className="bg-white border border-gray-200 p-grid-4">
            <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">ENVIRONMENTAL METRICS</h3>
            <div className="space-y-grid-3 grid-pattern p-grid-3">
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">CO2/ton cement</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.environmental.co2PerTon} kg</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="h-2 bg-latspace-dark" style={{ width: `${Math.max(0, 100 - (esgData.environmental.co2PerTon - 600) / 2)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Thermal Energy</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.environmental.thermalEnergy} kcal/kg</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="h-2 bg-latspace-medium" style={{ width: `${Math.max(0, 100 - (esgData.environmental.thermalEnergy - 700) / 2)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Electrical Energy</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.environmental.electricalEnergy} kWh/ton</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="h-2 bg-latspace-dark" style={{ width: `${Math.max(0, 100 - (esgData.environmental.electricalEnergy - 50) / 0.5)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Alt Fuel Usage</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.environmental.altFuelUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="h-2 bg-latspace-dark" style={{ width: `${esgData.environmental.altFuelUsage}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Clinker Factor</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.environmental.clinkerFactor}</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="h-2 bg-latspace-medium" style={{ width: `${(1 - esgData.environmental.clinkerFactor) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Water/ton</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.environmental.waterPerTon} L</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="h-2 bg-latspace-dark" style={{ width: `${Math.max(0, 100 - (esgData.environmental.waterPerTon - 50))}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-grid-4">
            <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">SOCIAL METRICS</h3>
            <div className="space-y-grid-3 grid-pattern p-grid-3">
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">LTIFR</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.social.ltifr}</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="h-2 bg-latspace-dark" style={{ width: `${Math.max(0, 100 - esgData.social.ltifr * 50)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Training Hours/Emp</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.social.trainingHours} hrs</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="h-2 bg-latspace-medium" style={{ width: `${Math.min(100, esgData.social.trainingHours * 3.33)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Local Employment</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.social.localEmployment}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="h-2 bg-latspace-dark" style={{ width: `${esgData.social.localEmployment}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">CSR Spend</span>
                  <span className="font-mono text-latspace-dark data-value">₹{esgData.social.csrSpend} M</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Contractor LTIFR</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.social.contractorSafety}</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="h-2 bg-latspace-medium" style={{ width: `${Math.max(0, 100 - esgData.social.contractorSafety * 50)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-latspace-medium uppercase tracking-wider">Total Employees</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.social.employees}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-grid-4">
            <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">GOVERNANCE & COMPLIANCE</h3>
            <div className="space-y-grid-3 grid-pattern p-grid-3">
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">ISO 14001</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.governance.iso14001 ? 'CERTIFIED' : 'NOT CERTIFIED'}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">ISO 45001</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.governance.iso45001 ? 'CERTIFIED' : 'NOT CERTIFIED'}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Sustainability Report</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.governance.sustainabilityReporting ? 'PUBLISHED' : 'NOT PUBLISHED'}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Board Independence</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.governance.boardIndependence}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="h-2 bg-latspace-dark" style={{ width: `${esgData.governance.boardIndependence}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-grid">
                  <span className="text-latspace-medium uppercase tracking-wider">Ethics Training</span>
                  <span className="font-mono text-latspace-dark data-value">{esgData.governance.ethicsTraining}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="h-2 bg-latspace-medium" style={{ width: `${esgData.governance.ethicsTraining}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid-3">
          <div className="bg-white border border-gray-200 p-grid-4">
            <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Cement Production Trends (6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="co2" stroke="#074D47" name="CO2 kg/ton" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="altFuel" stroke="#22867C" name="Alt Fuel %" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="clinkerFactor" stroke="#89E4DA" name="Clinker Factor" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-gray-200 p-grid-4">
            <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Plant Performance Overview</h3>
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
        </div>

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