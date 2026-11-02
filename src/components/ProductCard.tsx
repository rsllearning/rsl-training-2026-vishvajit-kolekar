import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <div>
      <span>{product.name} - Rs.{product.price}</span>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}
