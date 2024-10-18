import { ShoppingCartIcon, XMark } from "@/assets/Icons";
import EmptyCard from "./reusables/EmptyCard";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const { cart, products, removeFromCart } = useCart();

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

  const total = calculateTotal();
  const deliveryCharge = 100;

  if (!cart || cart.items.length === 0) {
    return (
      <EmptyCard
        icon={<ShoppingCartIcon />}
        title="Your cart is empty"
        description="Looks like you haven't added any items yet"
      />
    );
  }

  return (
    <div className="cart flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      <div
        className="flex-grow overflow-auto w-full
      "
      >
        {cart.items.map((item) => {
          const product = products.find((p) => p.id === item.product);
          return (
            <div
              key={item.id}
              className="cart-item flex items-start justify-between gap-4 mb-4"
            >
              <div className="flex gap-2 items-center">
                {product && product.images.length > 0 && (
                  <img
                    src={product.images[0].image}
                    alt={product.images[0].alt_text || product.name}
                    className="w-12 h-12 object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="font-semibold">{product?.name}</span>
                  </div>
                  <span className="text-xs">
                    Size: {item.size} Quantity: {item.quantity}
                  </span>
                  <span className="text-sm flex gap-2">
                    NPR
                    <span
                      className={`${
                        product?.is_sale ? "line-through text-red-500" : ""
                      }`}
                    >
                      {product?.price}
                    </span>
                    <span className="text-green-500">
                      {product?.is_sale ? product.sale_price : ""}
                    </span>
                  </span>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)}>
                <XMark />
              </button>
            </div>
          );
        })}
      </div>
      <div className="cart-total absolute w-full left-0 bottom-0 bg-gray-200 py-5 px-3">
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
            NPR. {(total + deliveryCharge).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
