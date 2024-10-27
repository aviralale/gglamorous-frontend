import { Product } from "@/types/types";
import { ProductGrid } from "./ProductGrid";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/auth/auth";
import { AxiosError } from "axios";

interface ProductSectionProps {
  type: string;
}

export default function ProductSection({ type }: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productEndpoint = () => {
    switch (type) {
      case "new":
        return "/products/new_products/";
        break;

      case "sale":
        return "/products/on_sale/";
        break;
      default:
        return "/products/";
        break;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get<Product[]>(
          `${productEndpoint()}`
        );
        setProducts(response.data);
      } catch (err) {
        let errorMessage = "An error occurred while fetching products";

        if (err instanceof AxiosError) {
          errorMessage = err.response?.data?.message || err.message;
        }

        setError(errorMessage);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <span className="text-lg text-gray-600">Loading products...</span>
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
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className=" bg-gray-50">
      <div className="p-4">
        <div className="space-y-8">
          {products.length === 0 ? (
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  No products found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Check back later for new arrivals
                </p>
              </div>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
