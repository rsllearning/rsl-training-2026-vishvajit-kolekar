import { ProductCard } from "./ProductCard";
import data from "../../db.json";
import type { Product } from "../types";

export function ProductList() {
  const products: Product[] = data.products;

  return (
    <>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
