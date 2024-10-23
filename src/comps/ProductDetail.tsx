import { Product } from "@/types/types";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (size: string, color: string) => void;
}

export const ProductDetails = ({
  product,
  onAddToCart,
}: ProductDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      onAddToCart(selectedSize, selectedColor);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
      </div>

      <div className="flex items-center gap-4">
        {product.is_sale ? (
          <>
            <span className="text-2xl font-bold text-gray-900">
              NPR {product.sale_price}
            </span>
            <span className="text-lg text-gray-500 line-through">
              NPR {product.price}
            </span>
          </>
        ) : (
          <span className="text-2xl font-bold text-gray-900">
            NPR {product.price}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Sizes</h3>
        <div className="mt-2 flex gap-2">
          {Object.entries(product.sizes).map(([size, quantity]) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              disabled={quantity === 0}
              className={`px-3 py-1 rounded-md ${
                selectedSize === size
                  ? "bg-blue-500 text-white"
                  : quantity === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Colors</h3>
        <div className="mt-2 flex gap-2">
          {Object.entries(product.colors).map(([colorName, colorCode]) => (
            <button
              key={colorName}
              onClick={() => setSelectedColor(colorName)}
              className={`h-8 w-8 rounded-full border-2 ${
                selectedColor === colorName ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: colorCode }}
              title={colorName}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Fabric & Care</h3>
        <p className="mt-2 text-gray-600">{product.fabric_and_care}</p>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!selectedSize || !selectedColor}
        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Add to Cart
      </button>
    </div>
  );
};
