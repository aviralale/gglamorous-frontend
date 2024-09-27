import { ShoppingCartIcon } from "@/assets/Icons";
import EmptyCard from "./reusables/EmptyCard";

export default function Cart() {
  return (
    <>
      <EmptyCard
        icon={<ShoppingCartIcon />}
        title="Your cart is empty"
        description="Looks like you haven't added any items yet"
      />
    </>
  );
}
