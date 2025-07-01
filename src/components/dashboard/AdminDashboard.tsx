import React, { useState } from 'react';
import { Parameter, parameterRegistry } from '../../utils/mockData';
import { calculateAggregatedMetrics, getAggregatedProductionData, getAggregatedEnergyData, getFacilityBreakdownData } from '../../utils/aggregationUtils';
import { Factory, Zap, Leaf, Target, Activity, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ParameterSearch } from './ParameterSearch';
import { ParameterChart } from './ParameterChart';
import { downloadTxtFile, formatChartDataForTxt } from '../../utils/exportUtils';

export const AdminDashboard: React.FC = () => {
  const [selectedParameter, setSelectedParameter] = useState<Parameter | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'production' | 'energy' | 'emissions'>('overview');

  // Get aggregated metrics for group dashboard
  const aggregatedMetrics = calculateAggregatedMetrics();

  // Key operational metrics - group aggregated data
  const keyMetrics = {
    clinkerProduction: aggregatedMetrics.totalClinkerProduction,
    cementProduction: aggregatedMetrics.totalCementProduction,
    specificHeatConsumption: aggregatedMetrics.weightedSpecificHeatConsumption,
    specificPowerConsumption: aggregatedMetrics.weightedSpecificPowerConsumption,
    tsrTotal: aggregatedMetrics.weightedTSR,
    renewableEnergyRatio: aggregatedMetrics.weightedRenewableEnergyRatio,
    scope1Emissions: aggregatedMetrics.totalScope1Emissions,
    emissionIntensity: aggregatedMetrics.weightedEmissionIntensityTotal,
    plantLoadFactor: aggregatedMetrics.weightedPlantLoadFactor
  };

  // Production overview data for charts
  const productionData = getAggregatedProductionData();

  // Energy breakdown data
  const energyData = getAggregatedEnergyData();


  return (
    <div className="space-y-grid-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-grid-3">
        <div className="flex items-center">
          <img 
            src="/sagar-cements-logo.png" 
            alt="Sagar Cements Logo" 
            className="h-10 w-auto mr-3 flex-shrink-0"
          />
          <div>
            <h1 className="text-2xl font-semibold text-latspace-dark">
              Sagar Cements Group Dashboard
            </h1>
            <p className="text-sm text-latspace-medium mt-1">
              {aggregatedMetrics.facilitiesCount} Facilities • {aggregatedMetrics.totalCapacityMTPA.toFixed(1)} MTPA Total Capacity
            </p>
          </div>
        </div>
        <div className="text-sm text-latspace-medium font-mono">
          Group Dashboard • {new Date().toLocaleDateString()}
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
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">
                Total Group Clinker Production
              </p>
              <p className="text-xl font-mono text-latspace-dark data-value">
                {(keyMetrics.clinkerProduction / 1000000).toFixed(1)}M Tons
                <span className="text-sm text-latspace-medium ml-2">({aggregatedMetrics.integratedPlantsCount} plants)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
          <div className="flex items-center">
            <Zap className="w-6 h-6 text-green-600" />
            <div className="ml-grid-2">
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">
                Group Energy Efficiency (Weighted Avg)
              </p>
              <p className="text-xl font-mono text-latspace-dark data-value">
                {keyMetrics.specificHeatConsumption > 0 ? `${keyMetrics.specificHeatConsumption.toFixed(0)} kcal/kg` : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
          <div className="flex items-center">
            <Leaf className="w-6 h-6 text-red-600" />
            <div className="ml-grid-2">
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">
                Group Emission Intensity (Weighted Avg)
              </p>
              <p className="text-xl font-mono text-latspace-dark data-value">
                {keyMetrics.emissionIntensity.toFixed(0)} kg CO2/t
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-grid-3 grid-pattern">
          <div className="flex items-center">
            <Target className="w-6 h-6 text-latspace-dark" />
            <div className="ml-grid-2">
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">
                Group Renewable Energy (Weighted Avg)
              </p>
              <p className="text-xl font-mono text-latspace-dark data-value">
                {keyMetrics.renewableEnergyRatio.toFixed(1)}%
                <span className="text-sm text-latspace-medium ml-2">across all facilities</span>
              </p>
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
                  <h3 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">
                    Group Production Overview
                  </h3>
                  <button
                    onClick={() => {
                      const content = formatChartDataForTxt(productionData, 'Group Production Overview', 'name', 'value');
                      downloadTxtFile(content, 'Group_Production_Overview.txt');
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
                <div className="mt-4 text-sm text-latspace-medium">
                  <p>Total Group Capacity: {aggregatedMetrics.totalCapacityMTPA.toFixed(1)} MTPA</p>
                  <p>Active Facilities: {aggregatedMetrics.integratedPlantsCount} Integrated + {aggregatedMetrics.grindingUnitsCount} Grinding Units</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-grid-4">
                <div className="flex items-center justify-between mb-grid-3">
                  <h3 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">
                    Group Energy Performance vs Targets
                  </h3>
                  <button
                    onClick={() => {
                      const content = formatChartDataForTxt(energyData, 'Group Energy Performance vs Targets', 'category', 'value');
                      downloadTxtFile(content, 'Group_Energy_Performance.txt');
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
                <div className="mt-4 text-sm text-latspace-medium">
                  <p>Note: Values shown are production-weighted averages across all facilities</p>
                  <p>Data completeness: {aggregatedMetrics.averageDataCompleteness.toFixed(1)}% average</p>
                </div>
              </div>

              {/* Facility Breakdown Chart */}
              <div className="bg-white border border-gray-200 p-grid-4 col-span-2">
                <div className="flex items-center justify-between mb-grid-3">
                  <h3 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">Facility-wise Production Breakdown</h3>
                  <button
                    onClick={() => {
                      const facilityData = getFacilityBreakdownData('cement');
                      const content = formatChartDataForTxt(facilityData, 'Facility-wise Cement Production', 'name', 'value');
                      downloadTxtFile(content, 'Group_Facility_Breakdown.txt');
                    }}
                    className="p-2 rounded text-latspace-medium hover:text-latspace-dark border border-gray-300 hover:border-latspace-dark"
                    title="Export Chart Data"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getFacilityBreakdownData('cement')}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number, name: string, props: any) => [
                        `${value.toLocaleString()} Tons`,
                        'Cement Production'
                      ]}
                      labelFormatter={(label: string, payload: any) => {
                        const data = payload?.[0]?.payload;
                        return data ? `${label} (${data.type === 'integrated' ? 'Integrated' : 'Grinding'}, ${data.capacity})` : label;
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#3B82F6"
                      name="Cement Production"
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Integrated Plants ({aggregatedMetrics.integratedPlantsCount})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Grinding Units ({aggregatedMetrics.grindingUnitsCount})</span>
                  </div>
                </div>
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