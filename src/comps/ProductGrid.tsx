import { Product } from "@/types/types";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <a
          key={product.id}
          href={`/products/${product.slug}`}
          className="group"
        >
          <div className="aspect-square w-full overflow-hidden rounded-lg">
            <img
              src={product.images[0]?.image}
              alt={product.name}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-medium text-gray-900">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              {product.is_sale ? (
                <>
                  <span className="text-lg font-bold text-gray-900">
                    NPR {product.sale_price}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    NPR {product.price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  NPR {product.price}
                </span>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
