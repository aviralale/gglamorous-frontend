import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/auth/auth";

interface Product {
  id: number;
  name: string;
  slug: string;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    product_count: number;
  };
  images: Array<{
    id: number;
    image: string;
    image_url: string;
    alt_text: string | null;
  }>;
  price: string;
  is_sale: boolean;
  sale_price: string | null;
  discount_percentage: number;
}

interface CategoryData {
  name: string;
  slug: string;
  image?: string;
  products?: Product[];
}

interface HomePageCategoryProps {
  category: CategoryData;
}

const HomePageCategory = ({ category }: HomePageCategoryProps) => {
  // Use the first product's image as the category image, or fall back to a placeholder
  const backgroundImage =
    category.products?.[0]?.images[0]?.image_url || "/api/placeholder/800/600";

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      className="w-full h-full bg-cover bg-center group transition-transform duration-500 hover:scale-105"
    >
      <div className="w-full h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent text-white transition-all duration-300 group-hover:from-black/80">
        <div className="transform transition-all duration-300 group-hover:translate-y-[-10px]">
          <h2 className="text-2xl md:text-3xl font-semibold uppercase mb-2">
            {category.name}
          </h2>
          {category.products && (
            <p className="text-sm mb-3 opacity-80">
              {category.products.length} Products
            </p>
          )}
          <Link
            to={`/category/${category.slug}`}
            className="inline-block uppercase text-lg hover:text-gray-200 transition-colors border-b-2 border-transparent hover:border-white pb-1"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

const CategoryCollage = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // First fetch all categories
        const categoriesResponse = await axiosInstance.get("categories/");
        const categoriesData = categoriesResponse.data;

        // For each category, fetch its products
        const categoriesWithProducts = await Promise.all(
          categoriesData.map(async (category: CategoryData) => {
            try {
              const productsResponse = await axiosInstance.get(
                `products/by_category/?category_slug=${category.slug}`
              );
              return {
                ...category,
                products: productsResponse.data,
              };
            } catch (err) {
              console.error(
                `Error fetching products for category ${category.slug}:`,
                err
              );
              return category;
            }
          })
        );

        setCategories(categoriesWithProducts);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-gray-600">Loading categories...</div>
      </div>
    );
  }

  if (error || categories.length === 0) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-red-600">
          {error || "No categories available"}
        </div>
      </div>
    );
  }

  // Take only the first 4 categories for the grid
  const displayCategories = categories.slice(0, 4);

  return (
    <div className="w-full h-[100vh] p-4">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4">
        {displayCategories.map((category) => (
          <div
            key={category.slug}
            className="w-full h-full overflow-hidden shadow-lg"
          >
            <HomePageCategory category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCollage;
