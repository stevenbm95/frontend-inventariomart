export const transformOrders = (orders) =>
  orders.map((order) => ({
    id: order.id,
    user: order.user.name,
    total: order.totalAmount,
    status: order.status,
    consumption: order.orderItems.map((item) => ({
      id: item.id,
      idDrink: item.drinkId,
      nameDrink: item.drink.name,
      unit: item.drink.unit,
      quantity: item.quantity,
      salePrice: item.drink.salePrice,
      total: item.drink.salePrice * item.quantity,
    })),
    createdAt: order.createdAt,
  }));

export const filterOrders = (orders, searchUser, statusFilter) =>
  orders.filter((order) => {
    const userMatch = order.user.name.toLowerCase().includes(searchUser.toLowerCase());
    const statusMatch = statusFilter === "all" || statusFilter === "" ? true : order.status === statusFilter;
    return userMatch && statusMatch;
  });
