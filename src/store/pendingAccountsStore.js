import { create } from "zustand";
import axiosInstance from "../axios";

const usePendingAccountsStore = create((set) => ({
  accounts: [],
  fetchAccounts: async () => {
    const { data } = await axiosInstance.get("/orders/get-orders");
    set({ accounts: data });
  },
  fetchAccountsByUser: async (userId) => {
    const { data } = await axiosInstance.get(`/orders/get-orders/${userId}`);
    set({ accounts: data });
  },
  fetchAccountsByStatus: async (status) => {
    const { data } = await axiosInstance.get(`/orders/get-orders-by-status/${status}`);
    set({ accounts: data });
  },
  payAcount: async (id) => {
    await axiosInstance.put(`/orders/update-order/${id}`, {
      status: "paid",
    });
    set((state) => ({
      accounts: state.accounts.map((acc) =>
        acc.id === id ? { ...acc, status: "paid" } : acc
      ),
    }));
  },
}));

export default usePendingAccountsStore;
