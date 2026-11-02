import { useCartStore } from '../store/cartStore';

export function CartCounter() {
  const count = useCartStore((st) => st.items.reduce((total, item) => total + item.quantity, 0));
  return <span>Products in Cart : {count}</span>;
}
