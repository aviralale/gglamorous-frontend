import React from "react";
import { XMark } from "@/assets/Icons";
import { Product, WishlistItem } from "@/types/types";

interface WishListCardProps {
  item: WishlistItem;
  product: Product;
  removeFromWishList: (itemId: number) => Promise<void>;
  //   addToWishList: (
  //     productId: number,
  //     size: string,
  //     quantity: number
  //   ) => Promise<void>;
}

const WishListCard: React.FC<WishListCardProps> = ({
  item,
  product,
  removeFromWishList,
  //   addToWishList,
}) => {
  return (
    <div className="wishlist-item flex items-start justify-between gap-4 mb-4">
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
      <div className="flex flex-col gap-2">
        {/* <button
          onClick={() => addToWishList(product.id, item.size, item.quantity)}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
        >
          Add to WishList
        </button> */}
        <button onClick={() => removeFromWishList(item.id)}>
          <XMark />
        </button>
      </div>
    </div>
  );
};

export default WishListCard;
