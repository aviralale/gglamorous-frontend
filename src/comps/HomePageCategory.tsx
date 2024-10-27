import React from "react";
import { Link } from "react-router-dom";

interface CategoryData {
  image: string;
  title: string;
  link: string;
}

interface HomePageCategoryProps {
  image: string;
  title: string;
  link: string;
}

const HomePageCategory = ({ image, title, link }: HomePageCategoryProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="w-full h-full bg-cover bg-center"
    >
      <div className="w-full h-full flex flex-col justify-end pl-4 pb-4 bg-black/50 text-white">
        <h2 className="text-3xl font-semibold uppercase mb-2">{title}</h2>
        <Link
          to={link}
          className="uppercase underline text-lg hover:text-gray-200 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

const CategoryCollage = () => {
  const categories: CategoryData[] = [
    {
      image: "/api/placeholder/800/600",
      title: "New Arrivals",
      link: "/new-arrivals",
    },
    {
      image: "/api/placeholder/800/600",
      title: "Best Sellers",
      link: "/best-sellers",
    },
    {
      image: "/api/placeholder/800/600",
      title: "Tops",
      link: "/sale",
    },
    {
      image: "/api/placeholder/800/600",
      title: "Bottoms",
      link: "/collections",
    },
  ];

  return (
    <div className="w-full h-[100vh] grid grid-cols-2 grid-rows-2 gap-4 p-4">
      {categories.map((category, index) => (
        <div key={category.title} className="w-full h-full overflow-hidden ">
          <HomePageCategory
            image={category.image}
            title={category.title}
            link={category.link}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryCollage;
