import React from 'react';
import { Layout } from '../components/layout/Layout';
import { CarbonCreditsLedger } from '../components/dashboard/CarbonCreditsLedger';

export const CarbonCreditsHome: React.FC = () => {
  return (
    <Layout>
      <CarbonCreditsLedger />
    </Layout>
  );
};