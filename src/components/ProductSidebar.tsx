import { useAtomValue } from "jotai";
import { cartTotal } from "../atoms/cartAtoms";
import { CartItemsList } from "./CartItemsList";

export function ProductSidebar() {
  const total = useAtomValue(cartTotal);

  return (
    <aside>
      <h2>Cart</h2>
      <CartItemsList />
      <strong>Total: Rs {total}</strong>
      <button className="checkout">Checkout</button>
    </aside>
  );
}
