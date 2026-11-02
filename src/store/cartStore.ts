import { create } from 'zustand';
import type { Product, CartItem } from '../types';

type CartState = {
  items: CartItem[];
  status: 'idle' | 'submitting' | 'success' | 'error';
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  checkout: () => Promise<void>;
  clear: () => void;
};

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  status: 'idle',
  addItem: (product) =>
    set((state) => {
      const existingProduct = state.items.find((item) => item.id === product.id);
      if (existingProduct) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  checkout: async () => {
    set({ status: 'submitting' });
    try {
      const { items } = get();
      const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, totalPrice }),
      });
      if (!response.ok) throw new Error(`Checkout failed: ${response.status}`);
      set({ items: [], status: 'success' });
    } catch {
      set({ status: 'error' });
    }
  },
  clear: () => set({ items: [], status: 'idle' }),
}));
