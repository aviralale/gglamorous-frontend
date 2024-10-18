import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@/assets/Icons";
import EmptyCard from "../reusables/EmptyCard";
import { axiosInstance } from "@/auth/auth";
import { Order } from "@/types/types";
import OrderCard from "./OrderCard";

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders/user_orders/");
        setOrders(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading your orders...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <EmptyCard
          icon={<ShoppingCartIcon />}
          title="You have no orders"
          description="Looks like you haven't ordered any items yet"
        />
      )}
    </div>
  );
}
