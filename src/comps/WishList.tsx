import { HeartIcon } from "@/assets/Icons";
import EmptyCard from "./reusables/EmptyCard";
import { useWishList } from "@/contexts/WishListContext";
import WishListCard from "./WishlistCard";

export default function WishList() {
  const { wishList, products, removeFromWishList } = useWishList();

  if (!wishList || wishList.wishlist_items.length === 0) {
    return (
      <EmptyCard
        icon={<HeartIcon />}
        title="You have no saved items"
        description="Looks like you haven't added any items yet"
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
    </div>
  );
}
