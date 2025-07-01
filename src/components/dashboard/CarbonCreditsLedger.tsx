import React, { useState } from 'react';
import { TrendingUp, Plus, TrendingDown, Calendar, Download, Search, ChevronDown, Eye, Paperclip } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  type: 'Purchase' | 'Transfer' | 'Sale';
  quantity: number;
  price: number | null;
  description: string;
  hasEvidence: boolean;
}

export const CarbonCreditsLedger: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedPlant, setSelectedPlant] = useState('All Plants');

  // Mock data for carbon credit metrics
  const creditMetrics = {
    currentBalance: {
      value: 4000,
      unit: 'tCO₂e',
      trend: 'up'
    },
    totalPurchased: {
      value: 8000,
      unit: 'tCO₂e',
      prefix: '+'
    },
    totalUsedSold: {
      value: 4000,
      unit: 'tCO₂e',
      prefix: '-'
    },
    avgPurchasePrice: {
      value: 44.94,
      unit: 'per tCO₂e',
      currency: '₹'
    }
  };

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      date: 'Feb 15, 2024',
      type: 'Purchase',
      quantity: 5000,
      price: 45.50,
      description: 'Q1 2024 compliance purchase',
      hasEvidence: true
    },
    {
      id: '2',
      date: 'Feb 10, 2024',
      type: 'Transfer',
      quantity: -1500,
      price: null,
      description: 'Transfer to Gudipadu plant',
      hasEvidence: false
    },
    {
      id: '3',
      date: 'Jan 28, 2024',
      type: 'Sale',
      quantity: -2000,
      price: 48.00,
      description: 'Excess credits sale',
      hasEvidence: true
    },
    {
      id: '4',
      date: 'Jan 15, 2024',
      type: 'Purchase',
      quantity: 3000,
      price: 44.00,
      description: 'Emergency purchase for Rajasthan unit',
      hasEvidence: false
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Purchase':
        return 'bg-green-100 text-green-800';
      case 'Transfer':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sale':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All Types' || transaction.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-grid-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-grid-3">
        <div>
          <h1 className="text-2xl font-semibold text-latspace-dark">CCC Ledger</h1>
          <p className="text-sm text-latspace-medium mt-1">Track and manage Carbon Credit Certificates</p>
        </div>
        <div className="flex space-x-grid-2">
          <button className="flex items-center px-grid-4 py-grid-2 border border-gray-300 text-latspace-dark hover:border-latspace-dark transition-colors text-sm font-medium">
            <Download className="w-4 h-4 mr-2" />
            EXPORT
          </button>
          <button className="flex items-center px-grid-4 py-grid-2 bg-latspace-dark text-white hover:bg-latspace-medium transition-colors text-sm font-medium">
            <Plus className="w-4 h-4 mr-2" />
            ADD TRANSACTION
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-3">
        {/* Current Balance */}
        <div className="bg-white border border-gray-200 p-grid-4 grid-pattern">
          <div className="flex items-start justify-between mb-grid-3">
            <div>
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Current Balance</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="mb-grid-2">
            <p className="text-3xl font-mono text-latspace-dark data-value">{creditMetrics.currentBalance.value.toLocaleString()}</p>
            <span className="text-sm text-latspace-medium font-mono">{creditMetrics.currentBalance.unit}</span>
          </div>
        </div>

        {/* Total Purchased */}
        <div className="bg-green-50 border border-green-200 p-grid-4">
          <div className="flex items-start justify-between mb-grid-3">
            <div>
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wider">Total Purchased</p>
            </div>
            <Plus className="w-5 h-5 text-green-600" />
          </div>
          <div className="mb-grid-2">
            <p className="text-3xl font-mono text-green-800 data-value">
              {creditMetrics.totalPurchased.prefix}{creditMetrics.totalPurchased.value.toLocaleString()}
            </p>
            <span className="text-sm text-green-600 font-mono">{creditMetrics.totalPurchased.unit}</span>
          </div>
        </div>

        {/* Total Used/Sold */}
        <div className="bg-red-50 border border-red-200 p-grid-4">
          <div className="flex items-start justify-between mb-grid-3">
            <div>
              <p className="text-xs font-semibold text-red-700 uppercase tracking-wider">Total Used/Sold</p>
            </div>
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <div className="mb-grid-2">
            <p className="text-3xl font-mono text-red-800 data-value">
              {creditMetrics.totalUsedSold.prefix}{creditMetrics.totalUsedSold.value.toLocaleString()}
            </p>
            <span className="text-sm text-red-600 font-mono">{creditMetrics.totalUsedSold.unit}</span>
          </div>
        </div>

        {/* Avg Purchase Price */}
        <div className="bg-white border border-gray-200 p-grid-4 grid-pattern">
          <div className="flex items-start justify-between mb-grid-3">
            <div>
              <p className="text-xs font-semibold text-latspace-medium uppercase tracking-wider">Avg Purchase Price</p>
            </div>
            <Calendar className="w-5 h-5 text-latspace-medium" />
          </div>
          <div className="mb-grid-2">
            <p className="text-3xl font-mono text-latspace-dark data-value">
              {creditMetrics.avgPurchasePrice.currency}{creditMetrics.avgPurchasePrice.value}
            </p>
            <span className="text-sm text-latspace-medium font-mono">{creditMetrics.avgPurchasePrice.unit}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 p-grid-4">
        <div className="flex flex-col md:flex-row gap-grid-3 items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-latspace-dark"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 text-sm focus:outline-none focus:border-latspace-dark"
            >
              <option>All Types</option>
              <option>Purchase</option>
              <option>Transfer</option>
              <option>Sale</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Plant Filter */}
          <div className="relative">
            <select
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 text-sm focus:outline-none focus:border-latspace-dark"
            >
              <option>All Plants</option>
              <option>Matampally</option>
              <option>Gudipadu</option>
              <option>Rajasthan Unit 1</option>
              <option>Karnataka Plant</option>
              <option>Tamil Nadu Facility</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Date Range */}
          <button className="flex items-center px-4 py-2 border border-gray-300 text-sm hover:border-latspace-dark transition-colors">
            <Calendar className="w-4 h-4 mr-2" />
            DATE RANGE
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-grid-4 py-grid-3 text-left text-xs font-semibold text-latspace-medium uppercase tracking-wider">
                  Date
                </th>
                <th className="px-grid-4 py-grid-3 text-left text-xs font-semibold text-latspace-medium uppercase tracking-wider">
                  Type
                </th>
                <th className="px-grid-4 py-grid-3 text-left text-xs font-semibold text-latspace-medium uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-grid-4 py-grid-3 text-left text-xs font-semibold text-latspace-medium uppercase tracking-wider">
                  Price
                </th>
                <th className="px-grid-4 py-grid-3 text-left text-xs font-semibold text-latspace-medium uppercase tracking-wider">
                  Description
                </th>
                <th className="px-grid-4 py-grid-3 text-left text-xs font-semibold text-latspace-medium uppercase tracking-wider">
                  Evidence
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-grid-4 py-grid-3 text-sm text-latspace-dark">
                    {transaction.date}
                  </td>
                  <td className="px-grid-4 py-grid-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium ${getTypeColor(transaction.type)}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-grid-4 py-grid-3 text-sm font-mono text-latspace-dark data-value">
                    {transaction.quantity > 0 ? '+' : ''}{transaction.quantity.toLocaleString()} tCO₂e
                  </td>
                  <td className="px-grid-4 py-grid-3 text-sm font-mono text-latspace-dark data-value">
                    {transaction.price ? `₹${transaction.price.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-grid-4 py-grid-3 text-sm text-latspace-dark">
                    {transaction.description}
                  </td>
                  <td className="px-grid-4 py-grid-3">
                    {transaction.hasEvidence ? (
                      <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    ) : (
                      <button className="flex items-center text-gray-400 hover:text-gray-600 text-sm">
                        <Paperclip className="w-4 h-4 mr-1" />
                        Attach
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};