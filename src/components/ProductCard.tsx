import { useSetAtom } from "jotai";
import type { Product } from "../types";
import { addItem } from "../atoms/cartAtoms";

export function ProductCard({ product }: { product: Product }) {
  const addItemFn = useSetAtom(addItem);
  return (
    <div>
      <span>
        {product.name} — Rs {product.price}
      </span>
      <button onClick={() => addItemFn(product)} className="addToCart">
        Add to Cart
      </button>
    </div>
  );
}
