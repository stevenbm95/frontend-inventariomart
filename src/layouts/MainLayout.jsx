import Navbar from './Navbar';
import BottomNav from './BottomNav';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <Navbar />
      <main className="flex-grow"><Outlet /></main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;