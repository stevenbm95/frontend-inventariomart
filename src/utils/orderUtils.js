const findOrderAndUpdateItem = (orders, orderItemId, quantity) => {
  const order = orders.find(order =>
    order.orderItems.some(item => item.id === orderItemId)
  );
  if (!order) return null;

  const updatedItems = order.orderItems.map(item =>
    item.id === orderItemId ? { ...item, quantity } : item
  );

  const totalAmount = updatedItems.reduce(
    (sum, item) => sum + item.quantity * item.drink.salePrice,
    0
  );

  return { orderId: order.id, updatedItems, totalAmount };
};

export { findOrderAndUpdateItem };