import { useState, useEffect } from "react";
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
import { axiosInstance } from "@/auth/auth";
import { Review } from "@/types/types";
import { Product } from "@/types/types";
import BlackStarRating from "./BlackStarRating";
import ReviewForm from "./ReviewForm";

import { toast } from "react-toastify";

interface ProductDetailsProps {
  product: Product;
  productSlug: string;
  onAddToCart: (size: string, color: string) => void;
}

export const ProductDetails = ({
  product,
  productSlug,
}: ProductDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [quantity, setQuantity] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const { cart, addToCart } = useCart();
  const { addToWishList } = useWishList();
  const { isLoggedIn } = useAuth();

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    fetchReviews();
  };

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get<Review[]>(
        `reviews/product_reviews/?product_slug=${productSlug}`
      );
      setReviews(response?.data);
    } catch (err: any) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productSlug]);

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(cart, product.id, selectedSize, parseInt(quantity));
      toast.success(`Added ${product.name} to cart successfully.`);
    }
  };
  const handleAddToWishList = () => {
    if (selectedSize) {
      addToWishList(product.id, selectedSize);
      console.log("success");
      toast.success(`Added ${product.name} to wishlist successfully.`);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl uppercase text-gray-900">{product.name}</h1>
        <div className="flex items-center gap-4">
          {product.is_sale ? (
            <>
              <span className="text-lg text-muted-foreground text-red-500 line-through">
                NPR {product.price}
              </span>
              <span className="text-lg text-muted-foreground">
                NPR {product.sale_price}
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
          {product.available_sizes.map((sizeInfo) => (
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
          disabled={!isLoggedIn || !selectedSize || !quantity}
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
        <AccordionItem value="item-2">
          <AccordionTrigger>ABOUT</AccordionTrigger>
          <AccordionContent>{product.description}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger onClick={fetchReviews}>
            REVIEWS
            <BlackStarRating
              name="quality_rating"
              value={product.ratings.average.overall}
              readOnly
              size="small"
            />
          </AccordionTrigger>
          <AccordionContent className="max-h-[50vh] flex flex-col overflow-y-scroll">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <>
                  <div key={review.id} className="space-y-2">
                    <div>
                      <p className="font-semibold">
                        {review.user.name} said...
                      </p>
                      <p>{review.comment}</p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <div className="flex text-sm">
                          <p>Quality</p>
                          <BlackStarRating
                            name="quality_rating"
                            value={review.quality_rating}
                            readOnly
                            size="small"
                          />
                        </div>
                        <div className="flex">
                          <p>Value</p>
                          <BlackStarRating
                            name="quality_rating"
                            value={review.value_rating}
                            readOnly
                            size="small"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <p>Size: {review.size}</p>
                        <p className="text-muted-foreground text-xs">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="my-2" />
                </>
              ))
            ) : (
              <p>No reviews available for this product.</p>
            )}

            {showReviewForm ? (
              <ReviewForm
                productId={product.id}
                onReviewSubmitted={handleReviewSubmitted}
              />
            ) : (
              <button onClick={() => setShowReviewForm(true)}>
                Write a review
              </button>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductDetails;
