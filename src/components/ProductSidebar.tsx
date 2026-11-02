import { useCartStore } from '../store/cartStore';
import { CartItemsList } from './CartItemsList';
import { CartErrorBanner } from './CartErrorBanner';
import { CheckoutButton } from './CheckoutButton';

export function ProductSidebar() {
  const total = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  );

  return (
    <aside>
      <h2>Cart</h2>
      <CartItemsList />
      <strong>Total: Rs {total}</strong>
      <CartErrorBanner />
      <CheckoutButton />
    </aside>
  );
}
