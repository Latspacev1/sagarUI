import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex">
      <Navbar />
      <main className="flex-1 md:ml-64 p-0">
        <div className="w-full h-full px-grid-4 py-grid-6 md:px-grid-6 lg:px-grid-8 mt-14 md:mt-0">
          <div className="max-w-[1440px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};