import { createContext, useContext, useReducer } from 'react';
import type { Dispatch, ReactNode } from 'react';
import type { Product, CartItem } from '../types';

type State = { items: CartItem[] };
type Action =
  | { type: 'added'; product: Product }
  | { type: 'removed'; id: string };

function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'added': {
      const existingItem = state.items.find((item) => item.id === action.product.id);
      return {
        items: existingItem
          ? state.items.map((item) =>
            item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
          : [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case 'removed':
      return { items: state.items.filter((item) => item.id !== action.id) };
    default:
      throw new Error(`Unhandled action type: ${(action as { type: string }).type}`);
  }
}

const CartStateContext = createContext<State | null>(null);
const CartDispatchContext = createContext<Dispatch<Action> | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState() {
  const ctx = useContext(CartStateContext);
  if (!ctx) throw new Error('useCartState must be used within <CartProvider>');
  return ctx;
}

export function useCartDispatch() {
  const ctx = useContext(CartDispatchContext);
  if (!ctx) throw new Error('useCartDispatch must be used within <CartProvider>');
  return ctx;
}
