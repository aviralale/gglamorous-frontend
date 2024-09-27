import { Link } from "react-router-dom";

export default function CategoriesNav() {
  return (
    <div className="flex justify-center items-center gap-8 text-sm border-b">
      <Link
        to=""
        className="pb-5 border-b border-b-transparent hover:border-b-black transition-all duration-75 ease-in-out"
      >
        NEW
      </Link>
      <Link
        to=""
        className="pb-5 border-b border-b-transparent hover:border-b-black transition-all duration-75 ease-in-out"
      >
        BACK IN STOCK
      </Link>
      <Link
        to=""
        className="pb-5 border-b border-b-transparent hover:border-b-black transition-all duration-75 ease-in-out"
      >
        BEST SELLERS
      </Link>
      <Link
        to=""
        className="pb-5 border-b border-b-transparent hover:border-b-black transition-all duration-75 ease-in-out"
      >
        CLOTHING
      </Link>
      <Link
        to=""
        className="pb-5 border-b border-b-transparent hover:border-b-black transition-all duration-75 ease-in-out"
      >
        TOPS
      </Link>
      <Link
        to=""
        className="pb-5 border-b border-b-transparent hover:border-b-black transition-all duration-75 ease-in-out"
      >
        BOTTOMS
      </Link>
      <Link
        to=""
        className="pb-5 border-b border-b-transparent hover:border-b-black transition-all duration-75 ease-in-out"
      >
        LINEN
      </Link>
      <Link
        to=""
        className="pb-5 border-b border-b-transparent hover:border-b-black transition-all duration-75 ease-in-out"
      >
        CAMPAIGNS
      </Link>
      <Link
        to=""
        className="pb-5 border-b border-b-transparent hover:border-b-black transition-all duration-75 ease-in-out"
      >
        ACCESSORIES
      </Link>
      <Link
        to=""
        className="text-[#ff0000] pb-5 border-b border-b-transparent hover:border-b-[#ff0000] transition-all duration-75 ease-in-out"
      >
        SALE
      </Link>
    </div>
  );
}
