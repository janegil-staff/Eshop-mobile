import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [], // { product, quantity }

  addItem: (product, quantity = 1) =>
    set((state) => {
      const id = product.id || product._id;
      const existing = state.items.find(
        (i) => (i.product.id || i.product._id) === id
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            (i.product.id || i.product._id) === id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, { product, quantity }] };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => (i.product.id || i.product._id) !== id),
    })),

  setQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          (i.product.id || i.product._id) === id ? { ...i, quantity } : i
        )
        .filter((i) => i.quantity > 0),
    })),

  clear: () => set({ items: [] }),

  total: () =>
    get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
}));