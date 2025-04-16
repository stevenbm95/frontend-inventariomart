import React from 'react';
import { Home, Package, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <div className="btm-nav md:hidden">
      <button>
        <a href="/" className="text-primary">
          <Home />
          <span className="btm-nav-label">Inicio</span>
        </a>
      </button>
      <button>
        <a href="/productos" className="text-primary">
          <Package />
          <span className="btm-nav-label">Productos</span>
        </a>
      </button>
      <button>
        <a href="/perfil" className="text-primary">
          <User />
          <span className="btm-nav-label">Perfil</span>
        </a>
      </button>
    </div>
  );
};

export default BottomNav;