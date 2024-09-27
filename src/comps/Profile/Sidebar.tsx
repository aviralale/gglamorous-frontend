import {
  ArrowLeftStartOnRectangleIcon,
  ChevronRightIcon,
  CogIcon,
  HeartIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@/assets/Icons";
import ProfileCard from "./ProfileCard";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="ml-4 py-6">
      <ProfileCard />
      <div>
        <ul>
          <li>
            <Link
              to="/profile/my-details"
              className="flex items-center justify-between py-6 border-b group"
            >
              <div className="flex gap-2 items-center">
                <UserIcon />
                <span>My Details</span>
              </div>
              <ChevronRightIcon size="opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-4" />
            </Link>
          </li>
          <li>
            <Link
              to="/profile/change-password"
              className="flex items-center justify-between py-6 border-b group"
            >
              <div className="flex gap-2 items-center">
                <CogIcon />
                <span>Change Password</span>
              </div>
              <ChevronRightIcon size="opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-4" />
            </Link>
          </li>
          <li>
            <Link
              to="/profile/address-book"
              className="flex items-center justify-between py-6 border-b group"
            >
              <div className="flex gap-2 items-center">
                <MapPinIcon />
                <span>Address Book</span>
              </div>
              <ChevronRightIcon size="opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-4" />
            </Link>
          </li>
          <li>
            <Link
              to="/profile/my-orders"
              className="flex items-center justify-between py-6 border-b group"
            >
              <div className="flex gap-2 items-center">
                <ShoppingBagIcon />
                <span>My Orders</span>
              </div>
              <ChevronRightIcon size="opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-4" />
            </Link>
          </li>
          <li>
            <Link
              to="/profile/my-wishlist"
              className="flex items-center justify-between py-6 border-b group"
            >
              <div className="flex gap-2 items-center">
                <HeartIcon />
                <span>My WishList</span>
              </div>
              <ChevronRightIcon size="opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-4" />
            </Link>
          </li>
          <li>
            <Link
              to=""
              className="flex items-center justify-between py-6 border-b group text-[#ff0000]"
            >
              <div className="flex gap-2 items-center ">
                <ArrowLeftStartOnRectangleIcon />
                <span>Logout</span>
              </div>
              <ChevronRightIcon size="opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-4" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
