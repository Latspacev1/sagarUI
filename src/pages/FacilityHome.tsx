import React from 'react';
import { Layout } from '../components/layout/Layout';
import { FacilityDashboard } from '../components/dashboard/FacilityDashboard';

export const FacilityHome: React.FC = () => {
  return (
    <Layout>
      <FacilityDashboard />
    </Layout>
  );
};