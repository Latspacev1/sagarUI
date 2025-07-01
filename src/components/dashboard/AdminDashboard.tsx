import React, { useState } from 'react';
import { mockFacilities, Parameter, parameterRegistry } from '../../utils/mockData';
import { Factory, Zap, Leaf, Target, TrendingUp, BarChart3, Activity, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { ParameterSearch } from './ParameterSearch';
import { ParameterChart } from './ParameterChart';
import { downloadTxtFile, formatChartDataForTxt, formatMetricsForTxt } from '../../utils/exportUtils';

export const AdminDashboard: React.FC = () => {
  const [selectedParameter, setSelectedParameter] = useState<Parameter | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'production' | 'energy' | 'emissions'>('overview');

  // Get key metrics from parameter registry for Mattampally (since it's the facility with actual data)
  const getParameterValue = (id: string) => {
    const param = parameterRegistry.find(p => p.id === id);
    return param ? param.ytd : 0;
  };

  // Key operational metrics
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

  // Production overview data for charts
  const productionData = [
    { name: 'Clinker', value: keyMetrics.clinkerProduction, color: '#074D47' },
    { name: 'Cement', value: keyMetrics.cementProduction, color: '#22867C' }
  ];

  // Energy breakdown data
  const energyData = [
    { category: 'Specific Heat', value: keyMetrics.specificHeatConsumption, unit: 'kcal/kg', target: 700 },
    { category: 'Specific Power', value: keyMetrics.specificPowerConsumption, unit: 'kWh/t', target: 65 },
    { category: 'Renewable Energy', value: keyMetrics.renewableEnergyRatio, unit: '%', target: 30 }
  ];

  // Category distribution
  const categoryData = [
    { name: 'Production KPIs', count: parameterRegistry.filter(p => p.category === 'production').length, color: '#3B82F6' },
    { name: 'Energy Metrics', count: parameterRegistry.filter(p => p.category === 'energy').length, color: '#10B981' },
    { name: 'Emissions Data', count: parameterRegistry.filter(p => p.category === 'emissions').length, color: '#EF4444' }
  ];

  return (
    <div className="space-y-grid-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-grid-3">
        <div>
          <h1 className="text-2xl font-semibold text-latspace-dark">Sagar Cements Limited Dashboard</h1>
          <p className="text-sm text-latspace-medium mt-1">Sustainability Management System</p>
        </div>
        <div className="text-sm text-latspace-medium font-mono">
          Mattampally Plant • {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Parameter Search */}
      <ParameterSearch
        selectedParameter={selectedParameter}
        onParameterSelect={setSelectedParameter}
      />

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-3">
        <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
          <div className="flex items-center">
            <Factory className="w-6 h-6 text-blue-600" />
            <div className="ml-grid-2">
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Clinker Production</p>
              <p className="text-xl font-mono text-latspace-dark data-value">{(keyMetrics.clinkerProduction / 1000000).toFixed(1)}M Tons</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
          <div className="flex items-center">
            <Zap className="w-6 h-6 text-green-600" />
            <div className="ml-grid-2">
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Energy Efficiency</p>
              <p className="text-xl font-mono text-latspace-dark data-value">{keyMetrics.specificHeatConsumption} kcal/kg</p>
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
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Renewable Energy</p>
              <p className="text-xl font-mono text-latspace-dark data-value">{keyMetrics.renewableEnergyRatio}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Parameter-specific chart or overview charts */}
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
              <div className="bg-white border border-gray-200 p-grid-4">
                <div className="flex items-center justify-between mb-grid-3">
                  <h3 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">Production Overview</h3>
                  <button
                    onClick={() => {
                      const content = formatChartDataForTxt(productionData, 'Production Overview', 'name', 'value');
                      downloadTxtFile(content, 'Admin_Production_Overview.txt');
                    }}
                    className="p-2 rounded text-latspace-medium hover:text-latspace-dark border border-gray-300 hover:border-latspace-dark"
                    title="Export Chart Data"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Tons']} />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-gray-200 p-grid-4">
                <div className="flex items-center justify-between mb-grid-3">
                  <h3 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">Energy Performance vs Targets</h3>
                  <button
                    onClick={() => {
                      const content = formatChartDataForTxt(energyData, 'Energy Performance vs Targets', 'category', 'value');
                      downloadTxtFile(content, 'Admin_Energy_Performance.txt');
                    }}
                    className="p-2 rounded text-latspace-medium hover:text-latspace-dark border border-gray-300 hover:border-latspace-dark"
                    title="Export Chart Data"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10B981" name="Actual" />
                    <Bar dataKey="target" fill="#89E4DA" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            
            </div>
          )}

          {activeTab === 'production' && (
            <div className="bg-white border border-gray-200 p-grid-4">
              <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Production Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-3">
                {parameterRegistry.filter(p => p.category === 'production').map(param => (
                  <div
                    key={param.id}
                    className="p-grid-3 border border-gray-200 hover:border-blue-400 cursor-pointer transition-colors"
                    onClick={() => setSelectedParameter(param)}
                  >
                    <h4 className="font-semibold text-latspace-dark text-sm mb-1">{param.name}</h4>
                    <p className="text-xs text-latspace-medium mb-2">{param.subcategory}</p>
                    <p className="text-lg font-mono text-blue-600 data-value">{param.ytd.toLocaleString()} {param.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'energy' && (
            <div className="bg-white border border-gray-200 p-grid-4">
              <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Energy Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-3">
                {parameterRegistry.filter(p => p.category === 'energy').map(param => (
                  <div
                    key={param.id}
                    className="p-grid-3 border border-gray-200 hover:border-green-400 cursor-pointer transition-colors"
                    onClick={() => setSelectedParameter(param)}
                  >
                    <h4 className="font-semibold text-latspace-dark text-sm mb-1">{param.name}</h4>
                    <p className="text-xs text-latspace-medium mb-2">{param.subcategory}</p>
                    <p className="text-lg font-mono text-green-600 data-value">{param.ytd.toLocaleString()} {param.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'emissions' && (
            <div className="bg-white border border-gray-200 p-grid-4">
              <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Emissions Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-3">
                {parameterRegistry.filter(p => p.category === 'emissions').map(param => (
                  <div
                    key={param.id}
                    className="p-grid-3 border border-gray-200 hover:border-red-400 cursor-pointer transition-colors"
                    onClick={() => setSelectedParameter(param)}
                  >
                    <h4 className="font-semibold text-latspace-dark text-sm mb-1">{param.name}</h4>
                    <p className="text-xs text-latspace-medium mb-2">{param.subcategory}</p>
                    <p className="text-lg font-mono text-red-600 data-value">{param.ytd.toLocaleString()} {param.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};