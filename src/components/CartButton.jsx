import React, {  useState } from 'react';
import useCartStore from "../store/cartStore";
import CartModal from "./CartModal";

const CartButton = () => {
  const { cart } = useCartStore();

  return (
    <>
      <button
        onClick={() => 
          document.getElementById('cart_modal').showModal()}
        
        className="fixed bottom-4 right-4 btn btn-accent"
      >
        Ver pedido ({cart.length})
      </button>
    </>
  );
};

export default CartButton;