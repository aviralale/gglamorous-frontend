import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from "../assets/images/logo.png";
import Authentication from "./Authentication";
import CartandWishlist from "./CartandWishlist";
import { HeartIcon } from "@/assets/Icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex justify-center items-center gap-2">
        <Select defaultValue="nepal">
          <SelectTrigger className="w-[180px] border-none outline-none shadow-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent className="border-none">
            <SelectGroup>
              <SelectItem value="nepal">
                <div className="flex items-center justify-center">
                  <img
                    src="https://wallpapercave.com/wp/wp4034151.jpg"
                    width={24}
                    className="aspect-square object-cover object-left rounded-full"
                    alt=""
                  />
                  <p className="text-sm uppercase ml-2">nep</p>
                </div>
              </SelectItem>
              <SelectItem value="usa">
                <div className="flex items-center justify-center">
                  <img
                    src="https://wallpapercave.com/wp/wp4034151.jpg"
                    width={24}
                    className="aspect-square object-cover object-left rounded-full"
                    alt=""
                  />
                  <p className="text-sm uppercase ml-2">usa</p>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <img width={180} src={Logo} alt="" />
      </div>
      <div className="flex gap-3 items-center">
        <Authentication />
        <Link to="">
          <HeartIcon />
        </Link>
        <CartandWishlist />
      </div>
    </div>
  );
}
