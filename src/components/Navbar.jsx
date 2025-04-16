import React from 'react';

const Navbar = () => {
  return (
    <div className="hidden md:flex justify-between items-center bg-base-200 p-4 shadow-md">
      <h1 className="text-xl font-bold">Inventario</h1>
      <nav className="flex gap-4">
        <a href="/" className="btn btn-ghost">Inicio</a>
        <a href="/productos" className="btn btn-ghost">Productos</a>
        <a href="/perfil" className="btn btn-ghost">Perfil</a>
      </nav>
    </div>
  );
};

export default Navbar;