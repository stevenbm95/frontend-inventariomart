import React from 'react';
import useCartStore from "../store/cartStore";

const CartButton = () => {
  const { cart } = useCartStore();

  return (
    <>
      <button
        onClick={() => 
          document.getElementById('cart_modal').showModal()}
        
        className="fixed bottom-18 right-4 btn btn-primary btn-sm md:btn-md hover:disabled border-none shadow-none"
      >
        Ver pedido ({cart.length})
      </button>
    </>
  );
};

export default CartButton;