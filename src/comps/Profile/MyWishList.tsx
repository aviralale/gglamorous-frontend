import { HeartIcon } from "@/assets/Icons";
import EmptyCard from "../reusables/EmptyCard";

export default function MyWishList() {
  return (
    <div>
      <h1 className="text-xl">My Wishlist</h1>
      <EmptyCard
        icon={<HeartIcon />}
        title="You have no saved items"
        description="Looks like you haven't added any items yet"
      />
    </div>
  );
}
