import React from 'react';
import { DollarSign, Home, Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-base-200 border-t border-base-300 py-2 md:hidden">
      <Link to="/" className={`flex flex-col items-center ${pathname === '/' ? 'text-primary' : 'text-gray-500'}`}>
        <Home size={24} />
        <span className="text-xs">Inicio</span>
      </Link>
      <Link to="/admin" className={`flex flex-col items-center ${pathname === '/admin' ? 'text-secondary' : 'text-gray-500'}`}>
        <Package size={24} />
        <span className="text-xs">Admin</span>
      </Link>
      <Link to="/orders" className={`flex flex-col items-center ${pathname === '/orders' ? 'text-third' : 'text-gray-500'}`}>
        <DollarSign  size={24} />
        <span className="text-xs">Cuentas</span>
      </Link>
    </div>
  );
};

export default BottomNav;
