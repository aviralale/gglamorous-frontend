import React, { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@/assets/Icons";
import EmptyCard from "../reusables/EmptyCard";
import { axiosInstance } from "@/auth/auth"; // Assuming this is the correct import path

interface Product {
  id: number;
  name: string;
  price: string;
  sale_price: string | null;
  images: { id: number; image: string; alt_text: string | null }[];
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: number;
  total_amount: string;
  payment_method: string;
  payment_status: string;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div className="border shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
        <span
          className={`px-2 py-1 rounded ${
            order.status === "Delivered"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {order.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        Date: {new Date(order.created_at).toLocaleDateString()}
      </p>
      <p className="text-sm mb-2">
        Total: NPR. {parseFloat(order.total_amount).toFixed(2)}
      </p>
      <p className="text-sm mb-2">
        Payment: {order.payment_method} - {order.payment_status}
      </p>
      <div className="mt-4">
        <h4 className="font-medium mb-2">Items:</h4>
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <img
              src={item.product.images[0]?.image}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-sm">
                Price: NPR.{" "}
                {item.product.sale_price
                  ? parseFloat(item.product.sale_price).toFixed(2)
                  : parseFloat(item.product.price).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
