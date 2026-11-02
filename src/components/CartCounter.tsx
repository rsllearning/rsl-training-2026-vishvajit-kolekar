import { useAtomValue } from "jotai";
import { cartCount } from "../atoms/cartAtoms";

export function CartCounter() {
  const count = useAtomValue(cartCount);
  return <span>Cart: {count}</span>;
}
