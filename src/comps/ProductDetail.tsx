import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from "@/contexts/CartContext";
import { HeartIcon } from "@/assets/Icons";
import { useWishList } from "@/contexts/WishListContext";
import { useAuth } from "@/auth/AuthContext";

interface Size {
  size: string;
  stock: number;
  available: boolean;
}

interface Image {
  id: number;
  image: string;
  alt_text: string | null;
  image_url: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  product_count: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  is_sale: boolean;
  sale_price: string | null;
  category: Category;
  images: Image[];
  available_sizes: Size[];
  in_stock: boolean;
  availability_status: string;
  colors: Record<string, string>;
  discount_percentage: number;
  fabric_and_care?: string;
}

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (size: string, color: string) => void;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");
  const { cart, addToCart } = useCart();
  const { addToWishList } = useWishList();
  const { isLoggedIn } = useAuth();

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(cart, `${product.id}`, selectedSize, selectedColor, quantity);
      console.log("success");
    }
  };
  const handleAddToWishList = () => {
    if (selectedSize && selectedColor) {
      addToWishList(product.id, selectedSize);
      console.log("success");
    }
  };
  const reversedSizes = [...product.available_sizes].reverse();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl uppercase text-gray-900">{product.name}</h1>
        <div className="flex items-center gap-4">
          {product.is_sale ? (
            <>
              <span className="text-lg text-muted-foreground text-red-500 line-through">
                NPR {product.sale_price}
              </span>
              <span className="text-lg text-muted-foreground">
                NPR {product.price}
              </span>
            </>
          ) : (
            <span className="text-lg text-muted-foreground">
              NPR {product.price}
            </span>
          )}
        </div>
        <p className="mt-2 text-gray-600">{product.description}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Sizes</h3>
        <div className="mt-2 flex gap-2 ">
          {reversedSizes.map((sizeInfo) => (
            <button
              key={sizeInfo.size}
              onClick={() => setSelectedSize(sizeInfo.size)}
              disabled={!sizeInfo.available}
              className={`px-3 py-1 ${
                selectedSize === sizeInfo.size
                  ? "bg-black text-white"
                  : !sizeInfo.available
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {sizeInfo.size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Colors</h3>
        <div className="mt-2 flex gap-2">
          {Object.entries(product.colors).map(([colorName, colorCode]) => (
            <button
              key={colorName}
              onClick={() => setSelectedColor(colorName)}
              className={`h-8 w-8 rounded-full border-2 ${
                selectedColor === colorName ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: colorCode }}
              title={colorName}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
          Quantity:
        </label>
        <input
          name="quantity"
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border border-black w-8 rounded-md h-8 p-1 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleAddToCart}
          disabled={!isLoggedIn || !selectedSize || !selectedColor}
          className="w-full uppercase border transition-all duration-200 ease-in-out border-black px-4 py-2 text-black hover:bg-black hover:text-white disabled:text-muted-foreground disabled:bg-transparent disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
        <button
          onClick={handleAddToWishList}
          disabled={!isLoggedIn || !selectedSize}
          className="aspect-square uppercase border transition-all duration-200 ease-in-out border-black p-2 text-black hover:bg-black hover:text-white disabled:text-muted-foreground disabled:bg-transparent disabled:cursor-not-allowed"
        >
          <HeartIcon />
        </button>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="uppercase">
            Fabric and care
          </AccordionTrigger>
          <AccordionContent>{product.fabric_and_care}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>ABOUT</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum,
            dolorem necessitatibus placeat ea repellat mollitia impedit?
            Mollitia error nam aliquid eligendi consequuntur? Quam distinctio
            aliquam autem! Officia corporis beatae odio voluptate similique
            expedita eaque non, quia voluptatum alias!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>REVIEWS</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductDetails;
