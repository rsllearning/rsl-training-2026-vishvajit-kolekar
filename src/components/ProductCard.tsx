import type { Product } from '../types';
import { useCartDispatch } from '../context/CartContext';

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useCartDispatch();
  return (
    <div className="product-card">
      <span>{product.name} — ${product.price}</span>
      <button onClick={() => dispatch({ type: 'added', product })}>Add to Cart</button>
    </div>
  );
}
