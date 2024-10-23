import React from "react";
import { X } from "lucide-react";

interface CartItem {
  id: number;
  product: number;
  quantity: number;
  size: string;
  stock?: number;
}

interface Product {
  id: number;
  name: string;
  price: string;
  sale_price?: string;
  is_sale: boolean;
  images: Array<{
    image: string;
    alt_text?: string;
  }>;
}

interface CartCardProps {
  item: CartItem;
  product: Product;
  removeFromCart: (itemId: number) => Promise<void>;
  onOrder: () => void;
}

const CartCard: React.FC<CartCardProps> = ({
  item,
  product,
  removeFromCart,
  onOrder,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4 items-center">
          {product.images.length > 0 && (
            <div className="w-16 h-16 rounded-md overflow-hidden">
              <img
                src={product.images[0].image}
                alt={product.images[0].alt_text || product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600">
              Size: {item.size} · Quantity: {item.quantity}
            </p>
            <div className="flex items-center gap-2">
              <span
                className={`${
                  product.is_sale
                    ? "line-through text-gray-400 text-xs"
                    : "text-primary"
                }`}
              >
                NPR {product.price}
              </span>
              {product.is_sale && (
                <span className="text-green-600 text-xs">
                  NPR {product.sale_price}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <button
            onClick={onOrder}
            className=" px-4 py-2 rounded-md text-sm transition-colors hover:underline"
          >
            Order
          </button>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <hr className="my-2" />
    </div>
  );
};

export default CartCard;
