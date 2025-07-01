import React, { useState } from 'react';
import { Parameter } from '../../utils/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BarChart3, TrendingUp, Table, Download } from 'lucide-react';
import { downloadTxtFile, formatTableDataForTxt, formatChartDataForTxt } from '../../utils/exportUtils';

interface ParameterChartProps {
  parameter: Parameter;
}

export const ParameterChart: React.FC<ParameterChartProps> = ({ parameter }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'bar' | 'table'>('chart');

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  const getChangePercent = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100);
  };

  const currentMonthValue = parameter.monthlyData[parameter.monthlyData.length - 1]?.value || 0;
  const previousMonthValue = parameter.monthlyData[parameter.monthlyData.length - 2]?.value || 0;
  const changePercent = getChangePercent(currentMonthValue, previousMonthValue);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'production': return '#3B82F6';
      case 'energy': return '#10B981';
      case 'emissions': return '#EF4444';
      default: return '#074D47';
    }
  };

  const chartColor = getCategoryColor(parameter.category);

  return (
    <div className="bg-white border border-gray-200 p-grid-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-grid-4">
        <div>
          <h3 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">
            {parameter.name}
          </h3>
          <p className="text-xs text-latspace-medium font-mono mt-1">
            {parameter.subcategory} • Monthly Trend Analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('chart')}
            className={`p-2 rounded ${viewMode === 'chart' ? 'bg-latspace-dark text-white' : 'text-latspace-medium hover:text-latspace-dark'}`}
            title="Line Chart"
          >
            <TrendingUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('bar')}
            className={`p-2 rounded ${viewMode === 'bar' ? 'bg-latspace-dark text-white' : 'text-latspace-medium hover:text-latspace-dark'}`}
            title="Bar Chart"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded ${viewMode === 'table' ? 'bg-latspace-dark text-white' : 'text-latspace-medium hover:text-latspace-dark'}`}
            title="Data Table"
          >
            <Table className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (viewMode === 'table') {
                const tableData = parameter.monthlyData.map((data, index) => {
                  const prevValue = index > 0 ? parameter.monthlyData[index - 1].value : data.value;
                  const monthlyChange = getChangePercent(data.value, prevValue);
                  return {
                    Month: data.month,
                    [`Value (${parameter.unit})`]: data.value.toLocaleString(),
                    'Change %': index === 0 ? '-' : `${monthlyChange >= 0 ? '+' : ''}${monthlyChange.toFixed(1)}%`
                  };
                });
                const content = formatTableDataForTxt(tableData, `${parameter.name} - Monthly Data`);
                downloadTxtFile(content, `${parameter.name.replace(/[^a-zA-Z0-9]/g, '_')}_monthly_data.txt`);
              } else {
                const content = formatChartDataForTxt(parameter.monthlyData, `${parameter.name} - Chart Data`, 'month', 'value');
                downloadTxtFile(content, `${parameter.name.replace(/[^a-zA-Z0-9]/g, '_')}_chart_data.txt`);
              }
            }}
            className="p-2 rounded text-latspace-medium hover:text-latspace-dark border border-gray-300 hover:border-latspace-dark"
            title="Export Data"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-3 mb-grid-4">
        <div className="bg-gray-50 p-grid-3 border border-gray-200">
          <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">YTD Total</p>
          <p className="text-lg font-mono text-latspace-dark data-value">{formatValue(parameter.ytd)} {parameter.unit}</p>
        </div>
        <div className="bg-gray-50 p-grid-3 border border-gray-200">
          <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Current Month</p>
          <p className="text-lg font-mono text-latspace-dark data-value">{formatValue(currentMonthValue)} {parameter.unit}</p>
        </div>
        <div className="bg-gray-50 p-grid-3 border border-gray-200">
          <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Month-on-Month</p>
          <p className={`text-lg font-mono data-value ${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(1)}%
          </p>
        </div>
        <div className="bg-gray-50 p-grid-3 border border-gray-200">
          <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Average</p>
          <p className="text-lg font-mono text-latspace-dark data-value">
            {formatValue(parameter.ytd / parameter.monthlyData.length)} {parameter.unit}
          </p>
        </div>
      </div>

      {/* Chart/Table Content */}
      {viewMode === 'chart' && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={parameter.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [formatValue(value), parameter.name]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={chartColor} 
              strokeWidth={2} 
              name={parameter.name}
              dot={{ fill: chartColor, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: chartColor, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {viewMode === 'bar' && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={parameter.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [formatValue(value), parameter.name]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Bar dataKey="value" fill={chartColor} name={parameter.name} />
          </BarChart>
        </ResponsiveContainer>
      )}

      {viewMode === 'table' && (
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-grid-3 py-grid-2 border-b border-gray-200">
            <h4 className="text-sm font-semibold text-latspace-dark uppercase tracking-wider">Monthly Data - Landscape View</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-grid-2 py-grid-2 text-left text-xs font-semibold text-latspace-dark uppercase tracking-wider border-b border-gray-200 min-w-[80px]">
                    Metric
                  </th>
                  {parameter.monthlyData.map((data) => (
                    <th key={data.month} className="px-grid-2 py-grid-2 text-center text-xs font-semibold text-latspace-dark uppercase tracking-wider border-b border-gray-200 min-w-[60px]">
                      {data.month}
                    </th>
                  ))}
                  <th className="px-grid-2 py-grid-2 text-center text-xs font-semibold text-latspace-dark uppercase tracking-wider border-b border-gray-200 min-w-[80px]">
                    YTD Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-grid-2 py-grid-2 text-sm font-semibold text-latspace-dark bg-gray-50">
                    Value ({parameter.unit})
                  </td>
                  {parameter.monthlyData.map((data) => (
                    <td key={data.month} className="px-grid-2 py-grid-2 text-sm font-mono text-latspace-dark text-center data-value">
                      {formatValue(data.value)}
                    </td>
                  ))}
                  <td className="px-grid-2 py-grid-2 text-sm font-mono font-semibold text-latspace-dark text-center data-value bg-gray-50">
                    {formatValue(parameter.ytd)}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-grid-2 py-grid-2 text-sm font-semibold text-latspace-dark bg-gray-50">
                    Change %
                  </td>
                  {parameter.monthlyData.map((data, index) => {
                    const prevValue = index > 0 ? parameter.monthlyData[index - 1].value : data.value;
                    const monthlyChange = getChangePercent(data.value, prevValue);
                    
                    return (
                      <td key={data.month} className={`px-grid-2 py-grid-2 text-sm font-mono text-center ${
                        index === 0 ? 'text-latspace-medium' : 
                        monthlyChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {index === 0 ? '-' : `${monthlyChange >= 0 ? '+' : ''}${monthlyChange.toFixed(1)}%`}
                      </td>
                    );
                  })}
                  <td className="px-grid-2 py-grid-2 text-sm font-mono text-latspace-medium text-center bg-gray-50">
                    -
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};