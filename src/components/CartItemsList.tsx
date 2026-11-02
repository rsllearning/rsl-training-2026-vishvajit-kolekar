import { useAtomValue, useSetAtom } from "jotai";
import { cartItems, removeItem } from "../atoms/cartAtoms";

export function CartItemsList() {
  const items = useAtomValue(cartItems);
  const removeItemFn = useSetAtom(removeItem);

  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>
          {i.name} × {i.quantity} — Rs {i.price * i.quantity}
          <button onClick={() => removeItemFn(i.id)} className="removeFromCart">
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
