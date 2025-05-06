import React, { useEffect, useState } from "react";
import CartButton from "../components/CartButton";
import CartModal from "../components/CartModal";
import GroupedDrinksList from "../components/GroupedDrinksList";
import useCartStore from "../store/cartStore";
import useUserStore from "../store/userStore";
import usePendingOrdersStore from "../store/pendingOrdersStore";

const HomePage = () => {
  const [showCart, setShowCart] = useState(false);
  const { addToCart } = useCartStore();
  const { fetchUsers } = useUserStore();
  const { fetchOrdersByStatus } = usePendingOrdersStore();

  useEffect(() => {
    fetchUsers();
    fetchOrdersByStatus('pending');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Productos disponibles</h1>
      {/* <ProductList /> */}
      <GroupedDrinksList handleEditStock={addToCart} text={"Hacer pedido"} />
      <CartButton />
      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
    </div>
  );
};

export default HomePage;
