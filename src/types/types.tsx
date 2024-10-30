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

interface SizeAvailability {
  size: string;
  stock: number;
  available: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  colors: Record<string, string>;
  price: string;
  is_sale: boolean;
  is_new: boolean;
  sale_price: string | null;
  category: Category;
  images: Image[];
  available_sizes: SizeAvailability[];
  in_stock: boolean;
  availability_status: string;
  discount_percentage: number;
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

export interface SearchResponse {
  data: Product[];
  total: number;
  page: number;
  per_page: number;
}

export interface SearchParams {
  q?: string;
  category_slug?: string;
  category_id?: string;
  min_price?: number;
  max_price?: number;
  page?: number;
  per_page?: number;
}
