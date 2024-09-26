import { Link } from "react-router-dom";

export default function CategoriesNav() {
  return (
    <div className="flex justify-center items-center gap-8 text-sm">
      <Link to="" className="pb-5 hover:border-b border-b-black">
        NEW
      </Link>
      <Link to="" className="pb-5 hover:border-b border-b-black">
        BACK IN STOCK
      </Link>
      <Link to="" className="pb-5 hover:border-b border-b-black">
        BEST SELLERS
      </Link>
      <Link to="" className="pb-5 hover:border-b border-b-black">
        CLOTHING
      </Link>
      <Link to="" className="pb-5 hover:border-b border-b-black">
        TOPS
      </Link>
      <Link to="" className="pb-5 hover:border-b border-b-black">
        BOTTOMS
      </Link>
      <Link to="" className="pb-5 hover:border-b border-b-black">
        LINEN
      </Link>
      <Link to="" className="pb-5 hover:border-b border-b-black">
        CAMPAIGNS
      </Link>
      <Link to="" className="pb-5 hover:border-b border-b-black">
        ACCESSORIES
      </Link>
      <Link
        to=""
        className="text-[#ff0000] pb-5 hover:border-b border-b-[#ff0000]"
      >
        SALE
      </Link>
    </div>
  );
}
