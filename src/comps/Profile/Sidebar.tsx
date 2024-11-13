import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
}

const navItems = [
  { to: "/profile/my-details", icon: UserIcon, label: "My Details" },
  { to: "/profile/change-password", icon: CogIcon, label: "Change Password" },
  { to: "/profile/address-book", icon: MapPinIcon, label: "Address Book" },
  { to: "/profile/my-orders", icon: ShoppingBagIcon, label: "My Orders" },
  { to: "/profile/my-wishlist", icon: HeartIcon, label: "My Wishlist" },
];

const Sidebar: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

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
      setIsLoggedIn(false);
      navigate("/");
    });
  }, [navigate, setIsLoggedIn]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="text-red-500">
          Error loading user data: {error.message}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isMobileMenuOpen ? (
          <X className="size-6" />
        ) : (
          <Menu className="size-6" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <Card className="hidden lg:block w-full min-h-screen border-none shadow-none ">
        <CardContent>
          {user ? (
            <ProfileCard
              firstName={user.first_name}
              lastName={user.last_name}
              email={user.email}
            />
          ) : (
            <h1 className="text-lg font-medium">No user data available</h1>
          )}

          <nav className="mt-6">
            <ul className="space-y-1">
              {navItems.map(({ to, icon: Icon, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 px-4 border-b transition-colors duration-200 hover:bg-gray-50 ${
                        isActive ? "bg-gray-50 text-black" : "text-gray-600"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex gap-3 items-center">
                          <Icon />
                          <span className="font-medium">{label}</span>
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
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full py-4 px-4 border-b text-red-500 transition-colors duration-200 hover:bg-gray-50"
                >
                  <div className="flex gap-3 items-center">
                    <ArrowLeftStartOnRectangleIcon />
                    <span className="font-medium">Logout</span>
                  </div>
                  <ChevronRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-4" />
                </button>
              </li>
            </ul>
          </nav>
        </CardContent>
      </Card>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu}
      />
      <div
        className={`lg:hidden fixed top-0 right-0 w-80 h-full bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 pt-16">
          {user ? (
            <ProfileCard
              firstName={user.first_name}
              lastName={user.last_name}
              email={user.email}
            />
          ) : (
            <h1 className="text-lg font-medium">No user data available</h1>
          )}

          <nav className="mt-6">
            <ul className="space-y-1">
              {navItems.map(({ to, icon: Icon, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 px-4 border-b transition-colors duration-200 hover:bg-gray-50 ${
                        isActive ? "bg-gray-50 text-black" : "text-gray-600"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex gap-3 items-center">
                          <Icon />
                          <span className="font-medium">{label}</span>
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
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full py-4 px-4 border-b text-red-500 transition-colors duration-200 hover:bg-gray-50"
                >
                  <div className="flex gap-3 items-center">
                    <ArrowLeftStartOnRectangleIcon />
                    <span className="font-medium">Logout</span>
                  </div>
                  <ChevronRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-4" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
