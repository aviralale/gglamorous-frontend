import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { axiosInstance } from "@/auth/auth";
import { Product, WishList } from "@/types/types";

interface WishListContextType {
  wishList: WishList | null;
  products: Product[];
  fetchWishList: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  addToWishList: (productId: number, size: string) => Promise<void>;
  removeFromWishList: (itemId: number) => Promise<void>;
}

const WishListContext = createContext<WishListContextType | undefined>(
  undefined
);

export const WishListProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [wishList, setWishList] = useState<WishList | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchWishList = async () => {
    try {
      const response = await axiosInstance.get("/wishlists/my_wishlist/");
      setWishList(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
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

  const addToWishList = async (productId: number, size: string) => {
    try {
      await axiosInstance.post("/wishlists/add_item/", {
        product: productId,
        size,
      });
      await fetchWishList();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishList = async (itemId: number) => {
    try {
      await axiosInstance.delete(`/wishlists/remove_item/`, {
        data: { product_id: itemId },
      });
      await fetchWishList();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishList();
    fetchProducts();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        wishList,
        products,
        fetchWishList,
        fetchProducts,
        addToWishList,
        removeFromWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (context === undefined) {
    throw new Error("useWishList must be used within a WishListProvider");
  }
  return context;
};
