import { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
import { logout, myUserData } from "@/auth/auth";
import { useAuth } from "@/auth/AuthContext";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

const navItems = [
  { to: "/profile/my-details", icon: UserIcon, label: "My Details" },
  { to: "/profile/change-password", icon: CogIcon, label: "Change Password" },
  { to: "/profile/address-book", icon: MapPinIcon, label: "Address Book" },
  { to: "/profile/my-orders", icon: ShoppingBagIcon, label: "My Orders" },
  { to: "/profile/my-wishlist", icon: HeartIcon, label: "My WishList" },
];

export default function Sidebar() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth(); // Use the useAuth hook

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await myUserData();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogout = useCallback(() => {
    logout(() => {
      setIsLoggedIn(false); // Update the global auth state
      navigate("/");
    });
  }, [navigate, setIsLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data: {error.message}</div>;
  }

  return (
    <div className="ml-4 py-6">
      {user ? (
        <ProfileCard
          firstName={user.first_name}
          lastName={user.last_name}
          email={user.email}
        />
      ) : (
        <h1>No user data available</h1>
      )}
      <nav>
        <ul>
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center justify-between py-6 border-b group ${
                    isActive ? "text-black" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex gap-2 items-center">
                      <Icon />
                      <span>{label}</span>
                    </div>
                    <ChevronRightIcon
                      className={`transition-opacity duration-300 size-4 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center justify-between py-6 border-b group text-[#ff0000] w-full"
            >
              <div className="flex gap-2 items-center">
                <ArrowLeftStartOnRectangleIcon />
                <span>Logout</span>
              </div>
              <ChevronRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-4" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
