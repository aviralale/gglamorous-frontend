import { useEffect, useState } from "react";
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
import Search from "./Search";

export default function Navbar() {
  const flagData = [
    {
      value: "nepal",
      label: "nep",
      icon: "https://wallpapercave.com/wp/wp4034151.jpg",
    },
    {
      value: "us",
      label: "usa",
      icon: "https://www.pngplay.com/wp-content/uploads/6/American-Flag-Logo-Transparent-Free-PNG.png",
    },
  ];

  const [selectedFlag, setSelectedFlag] = useState<string>(() => {
    return localStorage.getItem("selectedFlag") || "nepal";
  });

  useEffect(() => {
    localStorage.setItem("selectedFlag", selectedFlag);
  }, [selectedFlag]);

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex justify-center items-center gap-2">
        <Select
          value={selectedFlag}
          onValueChange={(value) => setSelectedFlag(value)}
        >
          <SelectTrigger className="w-[180px] border-none outline-none shadow-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent className="border-none">
            <SelectGroup>
              {flagData.map((flag) => (
                <SelectItem key={flag.value} value={flag.value}>
                  <div className="flex items-center justify-center">
                    <img
                      src={flag.icon}
                      width={24}
                      className="aspect-square object-cover object-left rounded-full"
                      alt={`${flag.label} flag`}
                    />
                    <p className="text-sm uppercase ml-2">{flag.label}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Link to="/">
        <img width={180} src={Logo} alt="Logo" />
      </Link>
      <div className="flex gap-3 items-center">
        <Search />
        <Authentication />
        <Link to="/profile/my-wishlist">
          <HeartIcon />
        </Link>
        <CartandWishlist />
      </div>
    </div>
  );
}
