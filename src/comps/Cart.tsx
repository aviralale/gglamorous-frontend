import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CartCard from "./CartCard";
import { useCart } from "@/contexts/CartContext";
import { axiosInstance } from "@/auth/auth";
import EmptyCard from "./reusables/EmptyCard";

interface Address {
  id: number;
  address_name: string;
  recipient_name: string;
  street_name: string;
  phone_number: string;
  city: string;
  is_default: boolean;
  user: number;
}

export default function Cart() {
  const { cart, products, removeFromCart } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get("/addresses/me/");
      setAddresses(response.data);
      const defaultAddress = response.data.find(
        (addr: Address) => addr.is_default
      );
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const calculateTotal = () => {
    return (cart?.items || []).reduce((total, item) => {
      const product = products.find((p) => p.id === item.product);
      if (product) {
        const price = product.is_sale
          ? parseFloat(product.sale_price || "0")
          : parseFloat(product.price);
        return total + price * item.quantity;
      }
      return total;
    }, 0);
  };

  const initiateOrder = (items: any[]) => {
    setOrderItems(items);
    setIsAddressModalOpen(true);
  };

  const createOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    try {
      const orderData = {
        address: selectedAddress,
        payment_method: "COD",
        products: orderItems.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          stock: item.stock || 1,
        })),
      };

      const response = await axiosInstance.post("/orders/", orderData);
      if (response.status === 201) {
        for (const item of orderItems) {
          await removeFromCart(item.id);
        }
        setIsAddressModalOpen(false);
        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const total = calculateTotal();
  const deliveryCharge = 100;

  if (!cart || cart.items.length === 0) {
    return (
      <EmptyCard
        icon={<ShoppingCart />}
        title="Your cart is empty"
        description="Looks like you haven't added any items yet"
      />
    );
  }

  return (
    <div>
      <div className="mb-6 ">
        <div className="flex flex-row items-center justify-between space-y-0 pb-4">
          <h1 className="text-xl">Your Cart</h1>
          <button
            onClick={() => initiateOrder(cart.items)}
            className="px-4 py-2 hover:underline "
          >
            Order All
          </button>
        </div>
        <div className="space-y-4">
          <div className="space-y-4">
            {cart.items.map((item) => {
              const product = products.find((p) => p.id === item.product);
              return (
                product && (
                  <CartCard
                    key={item.id}
                    item={item}
                    product={product}
                    removeFromCart={removeFromCart}
                    onOrder={() => initiateOrder([item])}
                  />
                )
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold">NPR {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Delivery charges:</span>
            <span>NPR {deliveryCharge.toFixed(2)}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">
                NPR {(total + deliveryCharge).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Delivery Address</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAddress === address.id
                    ? "border-blue-500 bg-blue-50"
                    : "hover:border-gray-400"
                }`}
                onClick={() => setSelectedAddress(address.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{address.address_name}</h3>
                    <p className="text-sm text-gray-600">
                      {address.recipient_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.street_name}
                    </p>
                    <p className="text-sm text-gray-600">{address.city}</p>
                    <p className="text-sm text-gray-600">
                      {address.phone_number}
                    </p>
                  </div>
                  {address.is_default && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsAddressModalOpen(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={createOrder}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedAddress}
            >
              Confirm Order
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
