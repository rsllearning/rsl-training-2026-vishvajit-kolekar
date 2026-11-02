import { useCartStore } from "../store/cartStore";
import { useShallow } from "zustand/react/shallow";

export function CartItemsList() {
  const { items, removeItem } = useCartStore(
    useShallow((s) => ({ items: s.items, removeItem: s.removeItem })),
  );

  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>
          {i.name} × {i.quantity} — Rs.{i.price * i.quantity}
          <button onClick={() => removeItem(i.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
