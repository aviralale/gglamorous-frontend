import { Product } from "@/types/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  console.log("Product:", products);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};
