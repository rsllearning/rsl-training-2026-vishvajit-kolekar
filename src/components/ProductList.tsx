import database from '../../db.json';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

export function ProductList() {
  const products: Product[] = database.products;

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
