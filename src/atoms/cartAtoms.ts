import { atom } from "jotai";
import type { Product, CartItem } from "../types";

export const cartItems = atom<CartItem[]>([]);

export const cartCount = atom((get) =>
  get(cartItems).reduce((n, i) => n + i.quantity, 0),
);

export const cartTotal = atom((get) =>
  get(cartItems).reduce((sum, i) => sum + i.price * i.quantity, 0),
);

export const addItem = atom(null, (get, set, product: Product) => {
  const items = get(cartItems);
  const existing = items.find((i) => i.id === product.id);
  set(
    cartItems,
    existing
      ? items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      : [...items, { ...product, quantity: 1 }],
  );
});

export const removeItem = atom(null, (_get, set, id: string) => {
  set(cartItems, (prev) => prev.filter((i) => i.id !== id));
});

export const clearCart = atom(null, (_get, set) => {
  set(cartItems, []);
});
