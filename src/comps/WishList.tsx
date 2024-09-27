import { HeartIcon } from "@/assets/Icons";
import EmptyCard from "./reusables/EmptyCard";

export default function Wishlist() {
  return (
    <>
      <EmptyCard
        icon={<HeartIcon />}
        title="You have no saved items"
        description="Looks like you haven't added any items yet"
      />
    </>
  );
}
