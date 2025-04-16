import { create } from 'zustand';
import axiosInstance from '../axios';

const useDrinkStore = create((set) => ({
  drinks: [],
  fetchDrinks: async () => {
    const { data } = await axiosInstance.get('/drinks/get-drinks');
    const drinksWithStock = data.map(d => ({
      ...d,
      stock: d.quantity,    // stock disponible
      quantity: undefined    // opcional, para no confundir
    }));
    set({ drinks: drinksWithStock });
  } ,
  
}));

export default useDrinkStore;