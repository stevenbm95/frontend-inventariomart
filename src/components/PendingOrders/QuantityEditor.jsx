import React from "react";
import { FiEdit, FiCheck, FiX } from "react-icons/fi";

const QuantityEditor = ({
  isEditing,
  quantity,
  availableStock,
  orderId,
  itemId,
  quantities,
  setQuantities,
  setEditingItems,
  updateOrderItemQuantity,
  refreshOrders,
}) => {

  console.log(quantities);
  console.log(quantity);
  console.log("availableStock"+availableStock);

  const key = `${orderId}-${itemId}`;
  const currentQuantity = quantities[key] ?? quantity;

  const updateQuantity = (newQty) => {
    const parsed = parseInt(newQty, 10);
    if (!isNaN(parsed)) {
      setQuantities((prev) => ({ ...prev, [key]: parsed }));
    }
  };

  const save = async () => {
    if (currentQuantity > availableStock) {
      alert("No hay suficiente stock disponible.");
      return;
    }

    if (currentQuantity > 0) {
      await updateOrderItemQuantity(itemId, currentQuantity);
      await refreshOrders();
      cancel();
    }
  };

  const cancel = () => {
    setEditingItems((prev) => ({ ...prev, [key]: false }));
  };

  if (!isEditing) {
    return (
      <div className="flex items-center justify-center">
        <span>{quantity}</span>
        <button
          onClick={() => setEditingItems((prev) => ({ ...prev, [key]: true }))}
          className="btn btn-xs btn-ghost ml-1"
        >
          <FiEdit size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <button
          onClick={() => updateQuantity(currentQuantity - 1)}
          className="btn btn-xs btn-ghost px-1"
          disabled={currentQuantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          min="1"
          max={availableStock}
          value={currentQuantity}
          onChange={(e) => updateQuantity(e.target.value)}
          className="input input-xs w-12 text-center mx-1"
        />
        <button
          onClick={() => updateQuantity(currentQuantity + 1)}
          className="btn btn-xs btn-ghost px-1"
          disabled={currentQuantity >= availableStock}
        >
          +
        </button>
      </div>

      <div className="flex space-x-1 mt-1">
        <button onClick={save} className="btn btn-xs btn-success">
          <FiCheck size={14} />
        </button>
        <button onClick={cancel} className="btn btn-xs btn-error">
          <FiX size={14} />
        </button>
      </div>
    </div>
  );
};

export default QuantityEditor;
