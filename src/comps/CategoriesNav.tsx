import { axiosInstance } from "@/auth/auth";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  product_count: number;
}

export default function CategoriesNav() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    ` border-b-2 py-2 transition-all duration-75 ease-in-out ${
      isActive ? "border-black" : "border-transparent"
    }`;

  const saleNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-[#ff0000] py-2 border-b-2 transition-all duration-75 ease-in-out ${
      isActive ? "border-[#ff0000]" : "border-transparent"
    }`;

  return (
    <div className="relative ">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden w-full py-4 flex items-center justify-between px-4 border-b"
      >
        <span className="font-medium">Categories</span>
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg z-50 transition-all duration-200 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col">
          <NavLink
            to="/c/new_products"
            className="px-4 py-3 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            NEW
          </NavLink>
          {categories.map((category) => (
            <NavLink
              key={category.id}
              to={`/category/${category.slug}`}
              className="px-4 py-3 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {category.name.toUpperCase()}
            </NavLink>
          ))}
          <NavLink
            to="/c/on_sale"
            className="px-4 py-3 hover:bg-gray-50 text-[#ff0000]"
            onClick={() => setIsMenuOpen(false)}
          >
            SALE
          </NavLink>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-center items-center gap-8 text-sm border-b">
        <NavLink to="/c/new_products" className={navLinkClasses}>
          NEW
        </NavLink>
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={`/category/${category.slug}`}
            className={navLinkClasses}
          >
            {category.name.toUpperCase()}
          </NavLink>
        ))}
        <NavLink to="/c/on_sale" className={saleNavLinkClasses}>
          SALE
        </NavLink>
      </div>
    </div>
  );
}
