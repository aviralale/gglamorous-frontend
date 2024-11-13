import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types/types";
import { axiosInstance } from "@/auth/auth";

export default function ProductOfTheDay() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductOfTheDay = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "products/product_of_the_day/"
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product of the day");
        console.error("Error fetching product of the day:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductOfTheDay();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-red-600">
          {error || "No product available"}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${product.images[0]?.image})`,
      }}
      className="w-full h-[70vh] bg-cover bg-center relative"
    >
      <div className="w-full h-full flex flex-col justify-center px-8 md:pl-32 bg-black/50 text-white">
        <h1 className="text-2xl md:text-4xl font-semibold uppercase mb-4">
          Product of the day
        </h1>
        <h1 className="text-3xl md:text-6xl font-semibold uppercase mb-6">
          {product.name}
        </h1>
        <Link
          to={`/products/${product.slug}`}
          className="uppercase underline text-lg hover:text-gray-200 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
