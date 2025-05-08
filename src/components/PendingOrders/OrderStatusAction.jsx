import React from "react";

const OrderStatusAction = ({ status, orderId, handlePay, handleCancel }) => {
  if (status === "paid")
    return (
      <span className="bg-green-700 rounded-full text-white text-xs px-2 py-1">
        Pagado
      </span>
    );

  if (status === "cancelled")
    return (
      <span className="bg-red-700 rounded-full text-white text-xs px-2 py-1">
        Cancelado
      </span>
    );

  return (
    <div className="flex justify-end gap-2 mt-2">
      <button
        onClick={() => handlePay(orderId)}
        className="btn btn-sm btn-success"
      >
        Pagar
      </button>
      <button
        onClick={() => handleCancel(orderId)}
        className="btn btn-sm btn-error"
      >
        Cancelar
      </button>
    </div>
  );
};

export default OrderStatusAction;
