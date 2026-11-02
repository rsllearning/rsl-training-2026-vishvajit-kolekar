import { useCartStore } from '../store/cartStore';
import { CartItemsList } from './CartItemsList';

export function ProductSidebar() {
  const total = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  );
  const status = useCartStore((s) => s.status);
  const checkout = useCartStore((s) => s.checkout);

  return (
    <aside>
      <h2>Cart</h2>
      <CartItemsList />
      <strong>Total: Rs {total}</strong>
      {status === 'error' && <p>Checkout failed. Try again.</p>}
      {status === 'success' && <p>Order placed!</p>}
      <button onClick={checkout} disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Placing Order...' : 'Checkout'}
      </button>
    </aside>
  );
}
