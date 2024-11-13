import Logo from "../assets/images/logo.png";
import Authentication from "./Authentication";
import CartandWishlist from "./CartandWishlist";
import { HeartIcon, UserIcon } from "@/assets/Icons";
import { Link } from "react-router-dom";
import Search from "./Search";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/AuthContext";
import { TimeGreeting } from "./Greeting";
import { Menu, Search as SearchIcon, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      console.log("Please log in to access your wishlist");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="relative bg-white">
      {/* Main Navbar */}
      <div className="flex justify-between items-center p-4 border-b">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Time Greeting */}
        <div className="hidden lg:flex w-1/3 items-center gap-2">
          <TimeGreeting />
        </div>

        {/* Logo */}
        <Link to="/" className="flex justify-center w-1/3">
          <img
            width={180}
            src={Logo}
            alt="Logo"
            className="w-[120px] md:w-[180px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex w-1/3 gap-3 justify-end items-center">
          <div className="w-64">
            <Search />
          </div>
          {isLoggedIn ? (
            <Link to="/profile">
              <UserIcon />
            </Link>
          ) : (
            <Authentication />
          )}
          {isLoggedIn ? (
            <Link to="/profile/my-wishlist">
              <HeartIcon />
            </Link>
          ) : (
            <Button
              onClick={handleWishlistClick}
              variant="ghost"
              className="p-0"
            >
              <HeartIcon />
            </Button>
          )}
          {isLoggedIn && <CartandWishlist />}
        </div>

        {/* Mobile Icons */}
        <div className="flex lg:hidden gap-3 items-center">
          <Button
            onClick={toggleSearch}
            variant="ghost"
            size="icon"
            className="p-0"
          >
            <SearchIcon className="h-5 w-5" />
          </Button>
          {isLoggedIn && <CartandWishlist />}
        </div>
      </div>

      {/* Mobile Search Bar - Only visible when toggled */}
      {isSearchOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white z-50 p-4 border-b shadow-md">
          <Search />
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-white z-40 overflow-y-auto">
          <div className="p-4 flex flex-col gap-4">
            <TimeGreeting />
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <UserIcon />
                <span>Profile</span>
              </Link>
            ) : (
              <div onClick={() => setIsMobileMenuOpen(false)}>
                <Authentication />
              </div>
            )}
            {isLoggedIn ? (
              <Link
                to="/profile/my-wishlist"
                className="flex items-center gap-2 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HeartIcon />
                <span>Wishlist</span>
              </Link>
            ) : (
              <Button
                onClick={() => {
                  handleWishlistClick();
                  setIsMobileMenuOpen(false);
                }}
                variant="ghost"
                className="flex items-center gap-2 p-0"
              >
                <HeartIcon />
                <span>Wishlist</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
