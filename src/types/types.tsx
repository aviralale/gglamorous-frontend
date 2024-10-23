export interface Image {
  id: number;
  image: string;
  alt_text: string | null;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
}

export interface Product {
  id: number;
  images: Image[];
  category: Category;
  name: string;
  description: string;
  fabric_and_care: string;
  price: string;
  stock: number;
  sizes: Record<string, number>;
  colors: Record<string, string>;
  is_sale: boolean;
  sale_price: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  product: number;
  size: string;
  quantity: number;
  cart: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  created_at: string;
  user: number;
  products: number[];
}
export interface WishlistItem {
  id: number;
  product: Product;
  size: string;
  quantity: number;
  cart: number;
}

export interface WishList {
  id: number;
  wishlist_items: WishlistItem[];
  created_at: string;
  user: number;
  products: number[];
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  total_amount: string;
  payment_method: string;
  payment_status: string;
  status: string;
  created_at: string;
  items: OrderItem[];
}
