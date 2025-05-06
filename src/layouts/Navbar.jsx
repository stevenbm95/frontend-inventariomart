import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="hidden md:flex justify-between items-center bg-base-200 p-4 shadow-md">
      <h1 className="text-xl font-bold">Inventario</h1>
      <nav className="flex gap-4">
        <Link to="/" className="btn btn-ghost">Inicio</Link>
        <Link to="/admin" className="btn btn-ghost">Administracion</Link>
        <Link to="/orders" className="btn btn-ghost">Cuentas</Link>
      </nav>
    </div>
  );
};

export default Navbar;