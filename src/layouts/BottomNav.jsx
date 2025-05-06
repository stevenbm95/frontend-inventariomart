import React from 'react';
import { Home, Package, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <div className="btm-nav md:hidden">
      <button>
        <Link to="/" className="text-primary">
          <Home />
          <span className="btm-nav-label">Inicio</span>
        </Link>
      </button>
      <button>
        <Link to="/admin" className="text-primary">
          <Package />
          <span className="btm-nav-label">Admin</span>
        </Link>
      </button>
      <button>
        <Link to="/orders" className="text-primary">
          <User />
          <span className="btm-nav-label">Perfil</span>
        </Link>
      </button>
    </div>
  );
};

export default BottomNav;