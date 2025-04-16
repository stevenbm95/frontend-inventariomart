import React, { useState } from "react";
import useCartStore from "../store/cartStore";
import useUserStore from "../store/userStore";
import useDrinkStore from "../store/drinkStore";
import ControlQuantity from "./ControlQuantity";
import { formatPrice } from "../utils/formatPrice";
import { createOrder } from "../services/orderService";

const CartModal = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { users } = useUserStore();
  const { fetchDrinks } = useDrinkStore();
  const [selectedUserId, setSelectedUserId] = useState("");

  const total = cart.reduce(
    (acc, item) => acc + item.salePrice * item.quantity,
    0
  );

  const handleConfirmOrder = async () => {
    const user = users.find((u) => u.id === +selectedUserId);
    if (!user) {
      alert("Por favor selecciona un cliente");
      return;
    }

    const orderData = {
      userId: user.id,
      items: cart.map((item) => ({
        drinkId: item.id,
        quantity: item.quantity,
        price: item.salePrice,
      })),
      totalAmount: total,
    };

    try {
      await createOrder(orderData);
      await fetchDrinks();
      clearCart();
      document.getElementById("cart_modal").close();
      alert("Pedido realizado con éxito");
    } catch (err) {
      console.error(err);
      alert("Error al crear el pedido");
    }
  };

  return (
    <dialog id="cart_modal" className="modal">
      <div className="modal-box w-11/12 max-w-lg">
        <h3 className="font-bold text-lg mb-4">
          Pedido de
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="select select-md ml-2"
          >
            <option value="" disabled>
              Cliente
            </option>
            {users
              .filter((u) => u.role === "USER")
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
          </select>
        </h3>

        {cart.length === 0 ? (
          <p className="text-center">Tu carrito está vacío</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium">
                    {item.name} - {item.unit}
                  </h4>
                  <p>
                    {formatPrice(item.salePrice)} x {item.quantity} –{" "}
                    {formatPrice(item.salePrice * item.quantity)}
                  </p>
                </div>
                <ControlQuantity item={item} removeFromCart={removeFromCart} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <p className="text-right font-bold">Total: {formatPrice(total)}</p>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Cerrar</button>
          </form>
          {cart.length > 0 && (
            <button className="btn btn-primary" onClick={handleConfirmOrder}>
              Confirmar Pedido
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default CartModal;
