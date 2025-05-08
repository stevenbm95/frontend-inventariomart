import { create } from "zustand";
import axiosInstance from "../axios";
import { findOrderAndUpdateItem } from "../utils/orderUtils";
import {toast} from "react-toastify";

const usePendingOrdersStore = create((set, get) => ({
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
      await axiosInstance.delete(`/orders/${id}/items/${itemId}`);
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
      const { data } = await axiosInstance.patch(`/orders/item/${orderItemId}`, { quantity });
      console.log(data);

      const state = get();
      const result = findOrderAndUpdateItem(
        state.orders,
        orderItemId,
        quantity
      );

      if (!result) return;

      const { orderId, updatedItems, totalAmount } = result;
      await axiosInstance.put(`/orders/${orderId}`, {
        // orderItems: updatedItems,
        totalAmount,
      });
      toast.success(data.message);

      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId
            ? { ...order, orderItems: updatedItems, totalAmount }
            : order
        ),
      }));
    } catch (error) {
      const message =
      error?.response?.data?.message || "Error al actualizar cantidad";
      toast.error(message);
      throw error;
    }
  },
}));

export default usePendingOrdersStore;
