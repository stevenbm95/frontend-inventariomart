import { create } from "zustand";
import axiosInstance from "../axios";

const usePendingOrdersStore = create((set) => ({
  orders: [],
  fetchOrders: async () => {
    const { data } = await axiosInstance.get("/orders");
    set({ orders: data });
  },
  fetchOrdersByUser: async (userId) => {
    const { data } = await axiosInstance.get(`/orders/${userId}`);
    set({ orders: data });
  },
  fetchOrdersByStatus: async (status) => {
    const { data } = await axiosInstance.get(`/orders/status/${status}`);
    set({ orders: data });
  },
  payOrder: async (id) => {
    await axiosInstance.put(`/orders/${id}`, {
      status: "paid",
    });
    set((state) => ({
      orders: state.orders.map((acc) =>
        acc.id === id ? { ...acc, status: "paid" } : acc
      ),
    }));
  },
  cancelOrder: async (id) => {
    try {
      await axiosInstance.patch(`/orders/${id}/cancel`); 
      set((state) => ({
        orders: state.orders.filter((account) => account.id !== id),
      }));
    } catch (error) {
      console.error("Error cancelando orden:", error);
    }
  },
  removeOrderItem: async (id, itemId) => {
    try {
      await axiosInstance.delete(
        `/orders/${id}/items/${itemId}`
      );
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === id
            ? {
                ...order,
                orderItems: order.orderItems.filter(
                  (item) => item.id !== itemId
                ),
              }
            : order
        ),
      }));
    } catch (error) {
      console.log("Error eliminando item:", error);
      
    }
  },
  updateOrderItemQuantity: async (orderItemId, quantity) => {
    try {
      const response = await axiosInstance.patch(`/orders/item/${orderItemId}`, { quantity });
      
      // Actualizar el estado local
      set((state) => ({
        orders: state.orders.map(order => {
          const updatedItems = order.orderItems.map(item => {
            if (item.id === orderItemId) {
              return { ...item, quantity };
            }
            return item;
          });
          
          // Recalcular el total
          const totalAmount = updatedItems.reduce(
            (sum, item) => sum + (item.quantity * item.drink.salePrice), 
            0
          );
          
          return { ...order, orderItems: updatedItems, totalAmount };
        })
      }));
      
      return response.data;
    } catch (error) {
      console.error("Error updating item quantity:", error);
      throw error;
    }
  },
}));

export default usePendingOrdersStore;
