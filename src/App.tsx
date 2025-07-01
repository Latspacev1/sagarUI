import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { AdminHome } from './pages/AdminHome';
import { FacilityHome } from './pages/FacilityHome';
import { Facilities } from './pages/Facilities';
import { FacilityDetail } from './pages/FacilityDetail';
import { CCTSHome } from './pages/CCTSHome';
import { CarbonCreditsHome } from './pages/CarbonCreditsHome';
import { ManualEntry } from './components/data-collection/ManualEntry';
import { DocumentUpload } from './components/data-collection/DocumentUpload';
import { BulkUpload } from './components/data-collection/BulkUpload';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? (
          user?.role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/facility" replace />
        ) : (
          <Login />
        )
      } />
      
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminHome />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/facilities" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Facilities />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/ccts" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <CCTSHome />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/carbon-credits" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <CarbonCreditsHome />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/facility/:facilityId" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <FacilityDetail />
        </ProtectedRoute>
      } />
      
      <Route path="/facility" element={
        <ProtectedRoute allowedRoles={['facility_head']}>
          <FacilityHome />
        </ProtectedRoute>
      } />
      
      <Route path="/facility/manual-entry" element={
        <ProtectedRoute allowedRoles={['facility_head']}>
          <ManualEntry />
        </ProtectedRoute>
      } />
      
      <Route path="/facility/upload-docs" element={
        <ProtectedRoute allowedRoles={['facility_head']}>
          <DocumentUpload />
        </ProtectedRoute>
      } />
      
      <Route path="/facility/bulk-upload" element={
        <ProtectedRoute allowedRoles={['facility_head']}>
          <BulkUpload />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
