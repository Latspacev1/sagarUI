import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { mockFacilities } from '../utils/mockData';
import { Building, MapPin, User, TrendingUp, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Facilities: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'esgScore' | 'completion'>('name');
  const [filterScore, setFilterScore] = useState<'all' | 'excellent' | 'good' | 'improvement'>('all');
  const [filterType, setFilterType] = useState<'all' | 'integrated' | 'grinding'>('all');

  // Calculate total production capacity
  const totalCapacity = mockFacilities.reduce((sum, facility) => {
    return sum + parseFloat(facility.capacity.replace(' MTPA', ''));
  }, 0);

  const filteredFacilities = mockFacilities
    .filter(facility => {
      const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          facility.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          facility.manager.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterScore === 'all' ||
                          (filterScore === 'excellent' && facility.esgScore >= 90) ||
                          (filterScore === 'good' && facility.esgScore >= 70 && facility.esgScore < 90) ||
                          (filterScore === 'improvement' && facility.esgScore < 70);
      
      const matchesType = filterType === 'all' || facility.type === filterType;
      
      return matchesSearch && matchesFilter && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'esgScore':
          return b.esgScore - a.esgScore;
        case 'completion':
          return b.dataCompleteness - a.dataCompleteness;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-latspace-dark border-latspace-dark';
    if (score >= 70) return 'text-latspace-medium border-latspace-medium';
    return 'text-latspace-light border-latspace-light';
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 90) return 'bg-latspace-dark';
    if (completion >= 70) return 'bg-latspace-medium';
    return 'bg-latspace-light';
  };

  return (
    <Layout>
      <div className="space-y-grid-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-grid-3">
          <div>
            <h1 className="text-2xl font-semibold text-latspace-dark">Sagar Cements Limited - Facilities Management</h1>
            <p className="text-sm text-latspace-medium font-mono mt-1">Total Production Capacity: {totalCapacity} MTPA</p>
          </div>
          <div className="text-sm text-latspace-medium font-mono">
            {filteredFacilities.length} of {mockFacilities.length} facilities
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-grid-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-2">
            <div className="relative">
              <Search className="absolute left-grid-2 top-1/2 transform -translate-y-1/2 text-latspace-medium w-4 h-4" />
              <input
                type="text"
                placeholder="SEARCH FACILITIES"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-grid-5 pr-grid-2 py-grid-2 border border-gray-300 focus:ring-0 focus:border-latspace-dark font-mono text-sm uppercase placeholder:text-xs"
              />
            </div>

            <div className="flex items-center space-x-grid">
              <Filter className="text-latspace-medium w-4 h-4" />
              <select
                value={filterScore}
                onChange={(e) => setFilterScore(e.target.value as any)}
                className="flex-1 px-grid-2 py-grid-2 border border-gray-300 focus:ring-0 focus:border-latspace-dark font-mono text-sm uppercase"
              >
                <option value="all">ALL SCORES</option>
                <option value="excellent">EXCELLENT (90+)</option>
                <option value="good">GOOD (70-89)</option>
                <option value="improvement">NEEDS IMPROVEMENT (&lt;70)</option>
              </select>
            </div>

            <div className="flex items-center space-x-grid">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="flex-1 px-grid-2 py-grid-2 border border-gray-300 focus:ring-0 focus:border-latspace-dark font-mono text-sm uppercase"
              >
                <option value="all">ALL PLANTS</option>
                <option value="integrated">INTEGRATED</option>
                <option value="grinding">GRINDING</option>
              </select>
            </div>

            <div className="flex items-center space-x-grid">
              <span className="text-xs font-semibold text-latspace-dark uppercase tracking-wider">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 px-grid-2 py-grid-2 border border-gray-300 focus:ring-0 focus:border-latspace-dark font-mono text-sm uppercase"
              >
                <option value="name">NAME</option>
                <option value="esgScore">ESG SCORE</option>
                <option value="completion">COMPLETION</option>
              </select>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-grid-3">
          {filteredFacilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white border border-gray-200 p-grid-4 cursor-pointer transition-colors hover:border-latspace-medium grid-pattern"
              onClick={() => navigate(`/admin/facility/${facility.id}`)}
            >
              <div className="flex items-center justify-between mb-grid-3">
                <h3 className="font-semibold text-latspace-dark text-base uppercase tracking-wide">{facility.name}</h3>
                <div className={`px-grid-2 py-grid text-xs font-mono border ${getScoreColor(facility.esgScore)} data-value`}>
                  {facility.esgScore}
                </div>
              </div>
              <div className="flex items-center text-xs text-latspace-medium mb-grid font-mono">
                <MapPin className="w-3 h-3 mr-1" />
                {facility.location}
              </div>
              {facility.company && (
                <div className="text-xs text-latspace-medium mb-grid-2 font-mono italic">
                  {facility.company}
                </div>
              )}

              <div className="space-y-grid-2">
                <div className="flex justify-between text-xs">
                  <span className="text-latspace-medium uppercase tracking-wider">Capacity</span>
                  <span className="text-latspace-dark font-mono data-value">{facility.capacity}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-latspace-medium uppercase tracking-wider">Type</span>
                  <span className="text-latspace-dark font-mono data-value uppercase">{facility.type}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-latspace-medium uppercase tracking-wider">Manager</span>
                  <span className="text-latspace-dark font-mono data-value">{facility.manager}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-latspace-medium uppercase tracking-wider">Completion</span>
                  <span className="text-latspace-dark font-mono data-value">{facility.dataCompleteness}%</span>
                </div>
                <div className="mt-grid-2">
                  <div className="w-full bg-gray-200 h-2">
                    <div
                      className={`h-2 transition-all ${getCompletionColor(facility.dataCompleteness)}`}
                      style={{ width: `${facility.dataCompleteness}%` }}
                    />
                  </div>
                </div>
                <div className="pt-grid-2 border-t border-gray-200">
                  <div className="flex justify-between text-xs">
                    <span className="text-latspace-medium uppercase tracking-wider">Updated</span>
                    <span className="text-latspace-dark font-mono data-value">
                      {new Date(facility.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFacilities.length === 0 && (
          <div className="text-center py-grid-10 border border-gray-200 bg-white">
            <Building className="w-grid-6 h-grid-6 text-latspace-medium mx-auto mb-grid-3" />
            <p className="text-latspace-medium font-mono uppercase text-sm">No facilities found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};