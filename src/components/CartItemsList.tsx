import { useCartState, useCartDispatch } from "../context/CartContext";

export function CartItemsList() {
  const { items } = useCartState();
  const dispatch = useCartDispatch();

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name} × {item.quantity} — ${item.price * item.quantity}
          <button onClick={() => dispatch({ type: "removed", id: item.id })}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
