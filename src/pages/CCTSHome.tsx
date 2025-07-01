import React from 'react';
import { Layout } from '../components/layout/Layout';
import { CCTSDashboard } from '../components/dashboard/CCTSDashboard';

export const CCTSHome: React.FC = () => {
  return (
    <Layout>
      <CCTSDashboard />
    </Layout>
  );
};