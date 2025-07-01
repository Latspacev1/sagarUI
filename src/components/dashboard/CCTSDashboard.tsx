import React from 'react';
import { TrendingDown, Info, Package, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const CCTSDashboard: React.FC = () => {
  // Mock data for CCTS compliance metrics
  const complianceMetrics = {
    averageIntensity: {
      current: 0.73,
      target: 0.7,
      unit: 'tCO2e/t',
      change: 4.3,
      trend: 'increase'
    },
    projectedBalance: {
      value: -2500,
      unit: 'tCO2e',
      type: 'deficit'
    },
    cccsbanked: {
      value: 15000,
      unit: 't'
    },
    daysToDeadline: {
      value: 34,
      unit: 'days'
    }
  };

  // Plant performance data for heat map
  const plantPerformance = [
    {
      name: 'MATAMPALLY',
      current: 0.73,
      target: 0.70,
      performance: '+4.3% over',
      status: 'over',
      color: 'bg-yellow-500'
    },
    {
      name: 'GUDIPADU',
      current: 0.69,
      target: 0.70,
      performance: '1.4% under',
      status: 'under',
      color: 'bg-teal-400'
    },
    {
      name: 'RAJASTHAN UNIT 1',
      current: 0.75,
      target: 0.70,
      performance: '+7.1% over',
      status: 'over',
      color: 'bg-red-500'
    },
    {
      name: 'KARNATAKA PLANT',
      current: 0.68,
      target: 0.70,
      performance: '2.9% under',
      status: 'under',
      color: 'bg-gray-300'
    },
    {
      name: 'TAMIL NADU FACILITY',
      current: 0.72,
      target: 0.70,
      performance: '+2.9% over',
      status: 'over',
      color: 'bg-yellow-500'
    }
  ];

  // Credit balance trend data
  const creditBalanceTrend = [
    { month: 'Jan', balance: 17000 },
    { month: 'Feb', balance: 18500 },
    { month: 'Mar', balance: 18200 },
    { month: 'Apr', balance: 19800 },
    { month: 'May', balance: 19200 },
    { month: 'Jun', balance: 20500 }
  ];

  return (
    <div className="space-y-grid-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-grid-3">
        <div>
          <h1 className="text-2xl font-semibold text-latspace-dark">CCTS Compliance Dashboard</h1>
          <p className="text-sm text-latspace-medium mt-1">Company-wide emissions and credit overview</p>
        </div>
        <div className="flex space-x-grid-2">
          <button className="px-grid-4 py-grid-2 border border-gray-300 text-latspace-dark hover:border-latspace-dark transition-colors text-sm font-medium">
            EXPORT REPORT
          </button>
          <button className="px-grid-4 py-grid-2 bg-latspace-dark text-white hover:bg-latspace-medium transition-colors text-sm font-medium">
            ADD DATA
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-3">
        {/* Average Intensity vs Target */}
        <div className="bg-white border border-gray-200 p-grid-4 grid-pattern">
          <div className="flex items-start justify-between mb-grid-3">
            <div>
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">AVERAGE INTENSITY</p>
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">VS TARGET</p>
            </div>
            <TrendingDown className="w-5 h-5 text-latspace-medium" />
          </div>
          <div className="mb-grid-2">
            <p className="text-3xl font-mono text-latspace-dark data-value">{complianceMetrics.averageIntensity.current}</p>
            <span className="text-sm text-latspace-medium font-mono">{complianceMetrics.averageIntensity.unit}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-500 text-sm">📈 {complianceMetrics.averageIntensity.change}% increase</span>
          </div>
          <div className="mt-grid-2 text-xs text-latspace-medium">
            Target: {complianceMetrics.averageIntensity.target} {complianceMetrics.averageIntensity.unit}
          </div>
        </div>

        {/* Projected Surplus/Deficit */}
        <div className="bg-white border border-gray-200 p-grid-4 grid-pattern">
          <div className="flex items-start justify-between mb-grid-3">
            <div>
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">PROJECTED</p>
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">SURPLUS/DEFICIT</p>
            </div>
            <Info className="w-5 h-5 text-latspace-medium" />
          </div>
          <div className="mb-grid-2">
            <p className="text-3xl font-mono text-latspace-dark data-value">{complianceMetrics.projectedBalance.value.toLocaleString()}</p>
            <span className="text-sm text-latspace-medium font-mono">{complianceMetrics.projectedBalance.unit}</span>
          </div>
        </div>

        {/* CCCS Banked */}
        <div className="bg-white border border-gray-200 p-grid-4 grid-pattern">
          <div className="flex items-start justify-between mb-grid-3">
            <div>
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">CCCS BANKED</p>
            </div>
            <Package className="w-5 h-5 text-latspace-medium" />
          </div>
          <div className="mb-grid-2">
            <p className="text-3xl font-mono text-latspace-dark data-value">{complianceMetrics.cccsbanked.value.toLocaleString()}</p>
            <span className="text-sm text-latspace-medium font-mono">{complianceMetrics.cccsbanked.unit}</span>
          </div>
        </div>

        {/* Days to Filing Deadline */}
        <div className="bg-white border border-gray-200 p-grid-4 grid-pattern">
          <div className="flex items-start justify-between mb-grid-3">
            <div>
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">DAYS TO FILING</p>
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">DEADLINE</p>
            </div>
            <Calendar className="w-5 h-5 text-latspace-medium" />
          </div>
          <div className="mb-grid-2">
            <p className="text-3xl font-mono text-latspace-dark data-value">{complianceMetrics.daysToDeadline.value}</p>
            <span className="text-sm text-latspace-medium font-mono">{complianceMetrics.daysToDeadline.unit}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid-3">
        {/* Plant Performance Heat Map */}
        <div className="bg-white border border-gray-200 p-grid-4">
          <div className="flex items-center justify-between mb-grid-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">Plant Performance Heat Map</h3>
              <Info className="w-4 h-4 text-latspace-medium" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-grid-3">
            {plantPerformance.map((plant, index) => (
              <div
                key={plant.name}
                className={`p-grid-4 text-white ${plant.color} ${
                  index === plantPerformance.length - 1 && plantPerformance.length % 2 !== 0 
                    ? 'col-span-2' 
                    : ''
                }`}
              >
                <div className="mb-grid-2">
                  <h4 className="font-semibold text-sm uppercase tracking-wide">{plant.name}</h4>
                  <p className="text-xs opacity-90">{plant.performance}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Current: {plant.current}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Target: {plant.target}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Balance Trend */}
        <div className="bg-white border border-gray-200 p-grid-4">
          <div className="flex items-center justify-between mb-grid-4">
            <h3 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">Credit Balance Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={creditBalanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Balance']} />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#074D47" 
                strokeWidth={2}
                dot={{ fill: '#074D47', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};