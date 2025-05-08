import React from "react";
import { formatDate } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import QuantityEditor from "./QuantityEditor";
import { FiEdit } from "react-icons/fi";
import OrderStatusActions from "./OrderStatusAction";

const OrderCollapse = ({
  order,
  index,
  openIndex,
  setOpenIndex,
  editingItems,
  setEditingItems,
  quantities,
  setQuantities,
  handlePay,
  handleCancel,
  updateOrderItemQuantity,
  refreshOrders,
}) => {
  const toggleCollapse = () => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="mb-4">
      <div className="collapse collapse-arrow bg-base-200">
        <input
          type="checkbox"
          checked={openIndex === index}
          onChange={toggleCollapse}
        />
        <div className="collapse-title text-lg font-medium flex justify-between items-center">
          <span>{order.user.name}</span>
          {order.status === "paid" ? (
            <span className="bg-green-700 rounded-full text-white text-xs px-2 py-1"></span>
          ) : order.status === "cancelled" ? (
            <span className="bg-red-700 rounded-full text-white text-xs px-2 py-1"></span>
          ) : (
            <span className="bg-blue-700 rounded-full text-white text-xs px-2 py-1"></span>
          )}
          <span>{formatDate(order.createdAt)}</span>
          <span>{formatPrice(order.totalAmount)}</span>
        </div>
        <div className="collapse-content">
          <table className="table w-full text-sm">
            <thead>
              <tr>
                <th>Consumo</th>
                <th className="text-center">Cantidad</th>
                <th className="text-right">Valores</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                
                <tr key={item.id}>
                  <td className="flex flex-col">
                    <span className="text-xs">{item.drink.name}</span>
                    <span className="text-sm capitalize font-bold">
                      {item.drink.unit}
                    </span>
                  </td>
                  <td className="text-center">
                    <QuantityEditor
                      isEditing={editingItems[`${order.id}-${item.id}`]}
                      quantity={item.quantity}
                      availableStock={item.drink.stock + item.quantity}
                      orderId={order.id}
                      itemId={item.id}
                      quantities={quantities}
                      setQuantities={setQuantities}
                      setEditingItems={setEditingItems}
                      updateOrderItemQuantity={updateOrderItemQuantity}
                      refreshOrders={refreshOrders}
                    />
                  </td>
                  <td className="text-right flex flex-col items-end">
                    <span className="text-xs">
                      {formatPrice(item.drink.salePrice)}
                    </span>
                    <span className="font-semibold">
                      {formatPrice(item.drink.salePrice * item.quantity)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <OrderStatusActions
            status={order.status}
            orderId={order.id}
            handlePay={() => handlePay(order.id)}
            handleCancel={() => handleCancel(order.id)}
          />
          {/* <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => handlePay(order.id)}
              className="btn btn-sm btn-success"
            >
              Pagar
            </button>
            <button
              onClick={() => handleCancel(order.id)}
              className="btn btn-sm btn-error"
            >
              Cancelar
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OrderCollapse;
