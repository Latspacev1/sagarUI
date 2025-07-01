import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Parameter, parameterRegistry } from '../../utils/mockData';

interface ParameterSearchProps {
  onParameterSelect: (parameter: Parameter | null) => void;
  selectedParameter: Parameter | null;
  parameters?: Parameter[]; // Optional facility-specific parameters
}

export const ParameterSearch: React.FC<ParameterSearchProps> = ({
  onParameterSelect,
  selectedParameter,
  parameters
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredParameters, setFilteredParameters] = useState<Parameter[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'production' | 'energy' | 'emissions'>('all');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sourceParameters = parameters || parameterRegistry;
    const filtered = sourceParameters.filter(param => {
      const matchesSearch = param.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          param.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          param.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || param.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredParameters(filtered);
  }, [searchTerm, categoryFilter, parameters]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleParameterSelect = (parameter: Parameter) => {
    onParameterSelect(parameter);
    setSearchTerm(parameter.name);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    onParameterSelect(null);
    setSearchTerm('');
    setIsOpen(false);
  };


  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'production': return 'bg-blue-100 text-blue-800';
      case 'energy': return 'bg-green-100 text-green-800';
      case 'emissions': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-grid-3">
      {/* Filter and Search Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-3">
        <div className="md:col-span-1">
          <label className="block text-xs font-semibold text-latspace-dark uppercase tracking-wider mb-grid">
            Category Filter
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="w-full px-grid-2 py-grid-2 border border-gray-300 focus:ring-0 focus:border-latspace-dark font-mono text-sm uppercase"
          >
            <option value="all">ALL CATEGORIES</option>
            <option value="production">PRODUCTION</option>
            <option value="energy">ENERGY</option>
            <option value="emissions">EMISSIONS</option>
          </select>
        </div>

        <div className="md:col-span-3 relative" ref={searchRef}>
          <label className="block text-xs font-semibold text-latspace-dark uppercase tracking-wider mb-grid">
            Search Parameters ({filteredParameters.length} available)
          </label>
          <div className="relative">
            <Search className="absolute left-grid-2 top-1/2 transform -translate-y-1/2 text-latspace-medium w-4 h-4" />
            <input
              type="text"
              placeholder="SEARCH BY PARAMETER NAME, DESCRIPTION, OR CATEGORY"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              className="w-full pl-grid-5 pr-grid-8 py-grid-2 border border-gray-300 focus:ring-0 focus:border-latspace-dark font-mono text-sm uppercase placeholder:text-xs"
            />
            <div className="absolute right-grid-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {selectedParameter && (
                <button
                  onClick={handleClearSelection}
                  className="text-latspace-medium hover:text-latspace-dark text-xs px-1"
                  title="Clear selection"
                >
                  ✕
                </button>
              )}
              <ChevronDown className="text-latspace-medium w-4 h-4" />
            </div>
          </div>

          {/* Dropdown Results */}
          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-96 overflow-y-auto">
              {filteredParameters.length > 0 ? (
                <>
                  <div className="sticky top-0 bg-gray-50 px-grid-3 py-grid-2 border-b border-gray-200">
                    <p className="text-xs font-mono text-latspace-medium uppercase">
                      {filteredParameters.length} Parameters Found
                    </p>
                  </div>
                  {filteredParameters.map((parameter) => (
                    <div
                      key={parameter.id}
                      className="px-grid-3 py-grid-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                      onClick={() => handleParameterSelect(parameter)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-semibold text-latspace-dark truncate">
                              {parameter.name}
                            </h4>
                            <span className={`px-2 py-1 text-xs font-mono rounded ${getCategoryBadgeColor(parameter.category)}`}>
                              {parameter.category.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-latspace-medium mb-1">
                            {parameter.subcategory} • {parameter.unit}
                          </p>
                          <p className="text-xs text-latspace-medium truncate">
                            {parameter.description}
                          </p>
                        </div>
                        <div className="ml-grid-2 text-right">
                          <p className="text-sm font-mono text-latspace-dark data-value">
                            YTD: {parameter.ytd.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="px-grid-3 py-grid-4 text-center">
                  <p className="text-sm text-latspace-medium font-mono">No parameters found</p>
                  <p className="text-xs text-latspace-medium mt-1">Try adjusting your search or filter</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Selected Parameter Display */}
      {selectedParameter && (
        <div className="bg-white border border-latspace-dark p-grid-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-grid-2">
                <h3 className="text-lg font-semibold text-latspace-dark">
                  {selectedParameter.name}
                </h3>
                <span className={`px-2 py-1 text-xs font-mono rounded ${getCategoryBadgeColor(selectedParameter.category)}`}>
                  {selectedParameter.category.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-3 text-sm">
                <div>
                  <span className="text-latspace-medium uppercase tracking-wider">Subcategory:</span>
                  <span className="ml-2 font-mono text-latspace-dark">{selectedParameter.subcategory}</span>
                </div>
                <div>
                  <span className="text-latspace-medium uppercase tracking-wider">Unit:</span>
                  <span className="ml-2 font-mono text-latspace-dark">{selectedParameter.unit}</span>
                </div>
                <div>
                  <span className="text-latspace-medium uppercase tracking-wider">YTD Total:</span>
                  <span className="ml-2 font-mono text-latspace-dark data-value">{selectedParameter.ytd.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-sm text-latspace-medium mt-grid-2">{selectedParameter.description}</p>
            </div>
            <button
              onClick={handleClearSelection}
              className="text-latspace-medium hover:text-latspace-dark ml-grid-4"
              title="Clear selection"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};