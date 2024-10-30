import { axiosInstance } from "@/auth/auth";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Define the structure of the category data
interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  product_count: number;
}

export default function CategoriesNav() {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get<Category[]>("categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex justify-center items-center gap-8 text-sm border-b">
      <NavLink
        to="/c/new_products"
        className={({ isActive }) =>
          `pb-5 border-b-2 transition-all duration-75 ease-in-out ${
            isActive ? "border-black" : "border-transparent"
          }`
        }
      >
        NEW
      </NavLink>
      <NavLink
        to="/c/best-sellers"
        className={({ isActive }) =>
          `pb-5 border-b-2 transition-all duration-75 ease-in-out ${
            isActive ? "border-black" : "border-transparent"
          }`
        }
      >
        BEST SELLERS
      </NavLink>
      {categories.map((category) => (
        <NavLink
          key={category.id}
          to={`/category/${category.slug}`}
          className={({ isActive }) =>
            `pb-5 border-b-2 transition-all duration-75 ease-in-out ${
              isActive ? "border-black" : "border-transparent"
            }`
          }
        >
          {category.name.toUpperCase()}
        </NavLink>
      ))}
      <NavLink
        to="/c/on_sale"
        className={({ isActive }) =>
          `text-[#ff0000] pb-5 border-b-2 transition-all duration-75 ease-in-out ${
            isActive ? "border-[#ff0000]" : "border-transparent"
          }`
        }
      >
        SALE
      </NavLink>
    </div>
  );
}
