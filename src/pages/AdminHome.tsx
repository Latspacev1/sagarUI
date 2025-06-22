import React from 'react';
import { Layout } from '../components/layout/Layout';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';

export const AdminHome: React.FC = () => {
  return (
    <Layout>
      <AdminDashboard />
    </Layout>
  );
};