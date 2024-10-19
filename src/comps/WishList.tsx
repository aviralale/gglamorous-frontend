import { HeartIcon } from "@/assets/Icons";
import EmptyCard from "./reusables/EmptyCard";
import { useWishList } from "@/contexts/WishListContext";
import WishListCard from "./WishlistCard";

export default function WishList() {
  const { wishList, products, removeFromWishList } = useWishList();

  const calculateTotal = () => {
    return (wishList?.wishlist_items || []).reduce((total, item) => {
      const product = products.find((p) => p.id === item.product.id);
      if (product) {
        const price = product.is_sale
          ? parseFloat(product.sale_price || "0")
          : parseFloat(product.price);
        return total + price;
      }
      return total;
    }, 0);
  };

  // const total = calculateTotal();
  // const deliveryCharge = 100;

  if (!wishList || wishList.wishlist_items.length === 0) {
    return (
      <EmptyCard
        icon={<HeartIcon />}
        title="You have no saved items"
        description="Looks like you haven't added any items to your wishlist yet"
      />
    );
  }

  return (
    <div className="wishlist flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4">Your WishList</h2>
      <div className="flex-grow overflow-auto w-full">
        {wishList.wishlist_items.map((item) => {
          const product = products.find((p) => p.id === item.product.id);
          if (product) {
            return (
              <WishListCard
                key={item.id}
                item={item}
                product={product}
                removeFromWishList={() => removeFromWishList(item.id)}
              />
            );
          }
          return null;
        })}
      </div>
      {/* <div className="wishlist-total absolute w-full left-0 bottom-0 bg-gray-200 py-5 px-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Subtotal:</span>
          <span className="text-sm font-semibold">NPR. {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Delivery charges:</span>
          <span className="text-sm">NPR. {deliveryCharge.toFixed(2)}</span>
        </div>
        <hr className="my-2 border-t border-gray-400" />
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">Total:</span>
          <span className="text-base font-semibold">
            NPR. {total.toFixed(2)}
          </span>
        </div>
      </div> */}
    </div>
  );
}
