import { CheckoutActor } from '../checkout/CheckoutActor';
import { useCartStore } from '../store/cartStore';

export function CartItemsList() {
  const items = CheckoutActor.useSelector((snapshot) => snapshot.context.items);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name} × {item.quantity} — Rs.{item.price * item.quantity}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
