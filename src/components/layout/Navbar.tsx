import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Building, FileText, Upload, Database, BarChart3, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const adminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/facilities', label: 'Facilities', icon: Building }
  ];

  const facilityNavItems = [
    { path: '/facility', label: 'Dashboard', icon: BarChart3 },
    { path: '/facility/manual-entry', label: 'Manual Entry', icon: FileText },
    { path: '/facility/upload-docs', label: 'Upload Documents', icon: Upload },
    { path: '/facility/bulk-upload', label: 'Bulk Upload', icon: Database }
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : facilityNavItems;

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white border border-latspace-dark text-latspace-dark hover:bg-latspace-dark hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <nav className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-grid-3 py-grid-3 border-b border-gray-200">
            <img src="/logo.svg" alt="LatSpace Logo" className="w-grid-4 h-grid-4" />
            <span className="ml-grid-2 text-xl font-semibold text-black tracking-tight">LatSpace</span>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-grid-3">
            <nav className="px-grid-2 space-y-grid">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-grid-2 py-grid-2 text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-latspace-dark text-white'
                        : 'text-latspace-dark hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-grid-2" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Info and Logout */}
          <div className="border-t border-gray-200 p-grid-3">
            <div className="mb-grid-2">
              <p className="text-sm font-semibold text-latspace-dark">{user?.name}</p>
              <p className="text-xs text-latspace-medium font-mono">{user?.role === 'admin' ? 'Administrator' : 'Facility Head'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-grid-2 py-grid-2 border border-latspace-dark text-sm font-medium text-latspace-dark bg-white hover:bg-latspace-dark hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4 mr-grid" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-latspace-dark bg-opacity-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};