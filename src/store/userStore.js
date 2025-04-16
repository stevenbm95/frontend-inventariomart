import { create } from 'zustand';
import axiosInstance from '../axios';

const useUserStore = create((set) => ({
  user: null,
  users: [],
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user) => set({ user }),
  fetchUsers: async  () => {
    const { data } = await axiosInstance.get('/users/get-users');
    set({ users: data });
  } 
  
}));

export default useUserStore;