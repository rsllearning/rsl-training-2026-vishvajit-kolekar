import { useCartState } from '../context/CartContext';

export function CartCounter() {
  const { items } = useCartState();
  return <span>Cart: {items.reduce((n, item) => n + item.quantity, 0)}</span>;
}