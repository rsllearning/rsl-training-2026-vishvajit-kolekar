import { CartItemsList } from './CartItemsList';
import { useCartState } from '../context/CartContext';

export function ProductSidebar() {
  const { items } = useCartState();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="cart-drawer">
      <h2>Cart</h2>
      <CartItemsList />
      <strong>Total: ${total}</strong>
      <button>Checkout</button>
    </aside>
  );
}
