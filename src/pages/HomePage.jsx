import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import ProductList from '../components/ProductList';
import CartButton from '../components/CartButton';
import CartModal from '../components/CartModal';
import useUserStore from '../store/userStore';

const HomePage = () => {

  const [showCart, setShowCart] = useState(false);
  const { fetchUsers } = useUserStore();

 useEffect(() => {
  fetchUsers();
 }, [])
 
  return (

    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Productos disponibles</h1>
    <ProductList />
    <CartButton />
    <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
  </div>
  );
};

export default HomePage;




    // <div className="p-4 space-y-6">
    //   <h1 className="text-2xl font-bold">Hola Steven 👋</h1>

    //   <div className="grid grid-cols-3 gap-4 text-center">
    //     <div className="bg-base-200 p-4 rounded-lg">
    //       <p className="text-sm">Bebidas</p>
    //       <p className="text-xl font-bold">12</p>
    //     </div>
    //     <div className="bg-base-200 p-4 rounded-lg">
    //       <p className="text-sm">Stock bajo</p>
    //       <p className="text-xl font-bold text-error">2</p>
    //     </div>
    //     <div className="bg-base-200 p-4 rounded-lg">
    //       <p className="text-sm">Consumos hoy</p>
    //       <p className="text-xl font-bold">5</p>
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-2 gap-4">
    //     <Link to="/register-consumption" className="btn btn-primary">Registrar consumo</Link>
    //     <Link to="/add-inventory" className="btn btn-secondary">Agregar bebida</Link>
    //     <Link to="/history" className="btn btn-accent col-span-2">Ver historial</Link>
    //   </div>

    //   <div className="mt-6">
    //     <h2 className="text-lg font-bold mb-2">Últimos movimientos</h2>
    //     <ul className="space-y-2">
    //       <li className="bg-base-100 p-2 rounded shadow">+10 Aguila Light (Admin)</li>
    //       <li className="bg-base-100 p-2 rounded shadow">-2 Poker (Steven)</li>
    //     </ul>
    //   </div>
    // </div>