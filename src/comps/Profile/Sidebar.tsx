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
import { NavLink } from "react-router-dom";
import { userData } from "@/data";

export default function Sidebar() {
  const user = userData;

  return (
    <div className="ml-4 py-6">
      <ProfileCard
        firstName={user.first_name}
        lastName={user.last_name}
        email={user.email}
      />
      <div>
        <ul>
          {/* My Details */}
          <li>
            <NavLink
              to="/profile/my-details"
              className={({ isActive }) =>
                `flex items-center justify-between py-6 border-b group ${
                  isActive ? "text-black" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex gap-2 items-center">
                    <UserIcon />
                    <span>My Details</span>
                  </div>
                  <ChevronRightIcon
                    size={`transition-opacity duration-300 size-4 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>

          {/* Change Password */}
          <li>
            <NavLink
              to="/profile/change-password"
              className={({ isActive }) =>
                `flex items-center justify-between py-6 border-b group ${
                  isActive ? "text-black" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex gap-2 items-center">
                    <CogIcon />
                    <span>Change Password</span>
                  </div>
                  <ChevronRightIcon
                    size={`transition-opacity duration-300 size-4 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>

          {/* Address Book */}
          <li>
            <NavLink
              to="/profile/address-book"
              className={({ isActive }) =>
                `flex items-center justify-between py-6 border-b group ${
                  isActive ? "text-black" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex gap-2 items-center">
                    <MapPinIcon />
                    <span>Address Book</span>
                  </div>
                  <ChevronRightIcon
                    size={`transition-opacity duration-300 size-4 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>

          {/* My Orders */}
          <li>
            <NavLink
              to="/profile/my-orders"
              className={({ isActive }) =>
                `flex items-center justify-between py-6 border-b group ${
                  isActive ? "text-black" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex gap-2 items-center">
                    <ShoppingBagIcon />
                    <span>My Orders</span>
                  </div>
                  <ChevronRightIcon
                    size={`transition-opacity duration-300 size-4 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>

          {/* My WishList */}
          <li>
            <NavLink
              to="/profile/my-wishlist"
              className={({ isActive }) =>
                `flex items-center justify-between py-6 border-b group ${
                  isActive ? "text-black" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex gap-2 items-center">
                    <HeartIcon />
                    <span>My WishList</span>
                  </div>
                  <ChevronRightIcon
                    size={`transition-opacity duration-300 size-4 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>

          {/* Logout */}
          <li>
            <NavLink
              to=""
              className="flex items-center justify-between py-6 border-b group text-[#ff0000]"
            >
              <div className="flex gap-2 items-center">
                <ArrowLeftStartOnRectangleIcon />
                <span>Logout</span>
              </div>
              <ChevronRightIcon size="opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-4" />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
