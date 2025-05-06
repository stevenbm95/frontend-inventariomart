import { create } from "zustand";
import axiosInstance from "../axios";

const useDrinkStore = create((set, get) => ({
  drinks: [],
  fetchDrinks: async () => {
    const { data } = await axiosInstance.get('/drinks');
    set({ drinks: data });
  },
  getGroupedDrinks: () => {
    const drinks = get().drinks;
    const grouped = [];

    if (drinks && drinks.length > 0) {
      drinks.forEach((drink) => {
        const existingDrink = grouped.find(d => d.name === drink.name);

        if (existingDrink) {
          existingDrink.variants.push({
            id: drink.id,
                name: drink.name,
                unit: drink.unit,
                stock: drink.stock,
                salePrice: drink.salePrice,
                quantity: drink.quantity,
          });
        } else {
          grouped.push({
            id: drink.id,
            name: drink.name,
            variants: [
              {
                id: drink.id,
                name: drink.name,
                unit: drink.unit,
                stock: drink.stock,
                salePrice: drink.salePrice,
                quantity: drink.quantity
              },
            ],
          });
        }
      });
    }

    return grouped;
  }
}));

export default useDrinkStore;
