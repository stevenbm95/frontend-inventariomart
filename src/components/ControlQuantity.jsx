import React from "react";
import useCartStore from "../store/cartStore";

const ControlQuantity = ({ item, removeFromCart }) => {
  const { updateQuantity, increaseQuantity, decreaseQuantity } = useCartStore();

  const quantity = item.quantity;     // cantidad en carrito
  const maxStock = item.stock;        // stock disponible
  const minStock = 1;

  const handleChange = (e) => {
    let v = e.target.value;
    // permitir borrar para teclear
    if (v === "") {
      updateQuantity(item.id, "");
      return;
    }
    let n = parseInt(v, 10);
    if (isNaN(n)) return;
    if (n < minStock) n = minStock;
    if (n > maxStock) n = maxStock;
    updateQuantity(item.id, n);
  };

  const handleBlur = () => {
    if (quantity < minStock) updateQuantity(item.id, minStock);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-xs"
        onClick={() => decreaseQuantity(item.id)}
        disabled={quantity <= minStock}
      >
        -
      </button>
      <input
        type="number"
        min={minStock}
        max={maxStock}
        step="1"
        value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={(e) => e.target.select()}
        className="input input-sm w-16 text-center"
      />
      <button
        className="btn btn-xs"
        onClick={() => increaseQuantity(item.id)}
        disabled={quantity >= maxStock}  // deshabilita al llegar al stock
      >
        +
      </button>
      <button
        className="btn btn-xs btn-error"
        onClick={() => removeFromCart(item.id)}
      >
        ✕
      </button>
    </div>
  );
};

export default ControlQuantity;
