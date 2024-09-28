import { ShoppingCartIcon } from "@/assets/Icons";
import EmptyCard from "../reusables/EmptyCard";

export default function MyOrders() {
  return (
    <div>
      <h1 className="text-xl">My Orders</h1>
      <EmptyCard
        icon={<ShoppingCartIcon />}
        title="Your have no orders"
        description="Looks like you haven't ordered any items yet"
      />
    </div>
  );
}
