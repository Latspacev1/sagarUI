import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  showDetails?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  label = "Data Completion", 
  showDetails = true 
}) => {
  const getStatusColor = (percent: number) => {
    if (percent >= 90) return 'bg-latspace-dark';
    if (percent >= 70) return 'bg-latspace-medium';
    return 'bg-latspace-light';
  };

  const getStatusText = (percent: number) => {
    if (percent >= 90) return 'EXCELLENT';
    if (percent >= 70) return 'GOOD';
    return 'NEEDS ATTENTION';
  };

  return (
    <div className="bg-white border border-gray-200 p-grid-4">
      <div className="flex items-center justify-between mb-grid-3">
        <h3 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">{label}</h3>
        <span className="text-2xl font-mono text-latspace-dark data-value">{percentage.toFixed(0)}%</span>
      </div>
      
      <div className="mb-grid-3">
        <div className="w-full bg-gray-100 h-grid">
          <div
            className={`h-grid transition-all duration-500 ${getStatusColor(percentage)}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {showDetails && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-latspace-medium uppercase tracking-wider">Status</span>
          <span className="text-xs font-mono text-latspace-dark">
            {getStatusText(percentage)}
          </span>
        </div>
      )}
    </div>
  );
};