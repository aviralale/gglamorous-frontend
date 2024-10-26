import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "@/auth/auth";
import { Product } from "@/types/types";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { ImageGallery } from "@/comps/ImageGallery";
import { ProductDetails } from "@/comps/ProductDetail";

interface ProductPageProps {
  product: Product;
}

const ProductPage = ({ product }: ProductPageProps) => {
  const handleAddToCart = (size: string, color: string) => {
    console.log(
      `Added to cart: ${product.name} - Size: ${size}, Color: ${color}`
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ImageGallery images={product.images} productName={product.name} />
        <ProductDetails product={product} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export const ProductPageWrapper = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get<Product>(
          `/products/${productSlug}/`
        );
        setProduct(response.data);
      } catch (err) {
        let errorMessage = "An error occurred while fetching the product";
        if (err instanceof AxiosError) {
          errorMessage = err.response?.data?.message || err.message;
        }
        setError(errorMessage);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      fetchProduct();
    }
  }, [productSlug]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <span className="text-lg text-gray-600">Loading product...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-lg text-red-500">{error}</div>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-lg text-gray-900">Product not found</div>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return <ProductPage product={product} />;
};
