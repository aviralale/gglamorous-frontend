import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { axiosInstance } from "@/auth/auth";
import { Cart, Product } from "@/types/types";

interface CartContextType {
  cart: Cart | null;
  products: Product[];
  fetchCart: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  addToCart: (
    cart: Cart | null,
    productId: string,
    size: string,
    color: string,
    quantity: string
  ) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/carts/me/");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (
    cart: Cart | null,
    productId: string,
    size: string,
    color: string,
    quantity: string
  ) => {
    try {
      const payload = {
        cart: cart?.id || null,
        product: productId,
        size: size,
        color,
        quantity,
      };

      await axiosInstance.post("/cart-items/", payload);
      await fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      await axiosInstance.delete(`/cart-items/${itemId}/`);
      await fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        fetchCart,
        fetchProducts,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
