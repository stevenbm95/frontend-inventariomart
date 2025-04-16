import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: [],

  // Agrega un ítem, o si existe, incrementa en 1 (inicial siempre 1)
  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.find(i => i.id === item.id);
      if (exists) {
        return {
          cart: state.cart.map(i =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        };
      }
      // al agregar, inicializa quantity = 1, y stock viene de item.stock
      return { cart: [...state.cart, { ...item, quantity: 1, stock: item.stock }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.id === id
          ? { ...i, quantity }
          : i
      ),
    })),

  increaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.id === id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.id === id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      ),
    })),

  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
