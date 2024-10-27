import { Link } from "react-router-dom";
import { Product } from "@/types/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const reversedSizes = [...product.available_sizes].reverse();
  return (
    <Link to={`/products/${product.slug}`} className="group">
      <div className=" relative w-full overflow-hidden">
        <img
          src={product.images[0].image}
          alt={product.name}
          className="h-full w-full aspect-[3/4] object-cover object-center"
        />
        <div className="absolute top-2 px-2 flex justify-between w-full">
          {product.is_new && (
            <span className=" uppercase bg-white p-2 py-1">new in</span>
          )}
          {product.is_sale && (
            <span className=" uppercase bg-green-500 text-white p-2 py-1">
              on sale
            </span>
          )}
        </div>
        <div className="absolute bottom-0 bg-white w-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
          {reversedSizes.map((sizeInfo) => (
            <button
              key={sizeInfo.size}
              disabled={!sizeInfo.available}
              className={`uppercase p-2`}
            >
              {sizeInfo.size}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-between">
        <h3 className=" uppercase truncate group-hover:underline">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-sm line-through font-medium text-red-500 text-muted-foreground">
            {product.is_sale ? `NPR ${product?.sale_price}` : ""}
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            NPR {product.price}
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        {Object.entries(product.colors).map(([colorName, colorCode]) => (
          <div
            key={colorName}
            className="w-4 h-4 rounded-full border border-gray-200"
            style={{ backgroundColor: colorCode }}
            title={colorName}
          />
        ))}
      </div>
    </Link>
  );
};
