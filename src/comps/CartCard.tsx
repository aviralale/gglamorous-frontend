import React from "react";
import { XMark } from "@/assets/Icons";
import { CartItem, Product } from "@/types/types"; // Import types from your project

interface CartCardProps {
  item: CartItem;
  product: Product;
  removeFromCart: (itemId: number) => Promise<void>;
}

const CartCard: React.FC<CartCardProps> = ({
  item,
  product,
  removeFromCart,
}) => {
  return (
    <div className="cart-item flex items-start justify-between gap-4 mb-4">
      <div className="flex gap-2 items-center">
        {product.images.length > 0 && (
          <img
            src={product.images[0].image}
            alt={product.images[0].alt_text || product.name}
            className="w-12 h-12 object-cover"
          />
        )}
        <div className="flex flex-col">
          <div className="flex justify-between">
            <span className="font-semibold">{product.name}</span>
          </div>
          <span className="text-xs">
            Size: {item.size} Quantity: {item.quantity}
          </span>
          <span className="text-sm flex gap-2">
            NPR
            <span
              className={`${
                product.is_sale ? "line-through text-red-500" : ""
              }`}
            >
              {product.price}
            </span>
            <span className="text-green-500">
              {product.is_sale ? product.sale_price : ""}
            </span>
          </span>
        </div>
      </div>
      <button onClick={() => removeFromCart(item.id)}>
        <XMark />
      </button>
    </div>
  );
};

export default CartCard;
