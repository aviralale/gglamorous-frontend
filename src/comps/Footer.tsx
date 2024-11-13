import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TiktokIcon,
} from "@/assets/Icons";
import { useAuth } from "@/auth/AuthContext";
import { Link } from "react-router-dom";

export default function Footer() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="footer bg-gray-100 py-8 px-4 sm:px-8 md:px-16">
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-base font-semibold">Let's Hang</h1>
          <ul className="flex flex-col gap-2">
            <li className="text-xs flex items-center gap-2 text-muted-foreground">
              <InstagramIcon className="w-5 h-5 text-black" />
              <a href="" target="_blank">
                Instagram
              </a>
            </li>
            <li className="text-xs text-muted-foreground flex items-center gap-2">
              <TiktokIcon className="w-5 h-5 text-black" />
              <a href="" target="_blank">
                Tiktok
              </a>
            </li>
            <li className="text-xs text-muted-foreground flex items-center gap-2">
              <FacebookIcon className="w-5 h-5 text-black" />
              <a href="" target="_blank">
                Facebook
              </a>
            </li>
            <li className="text-xs text-muted-foreground flex items-center gap-2">
              <PinterestIcon className="w-5 h-5 text-black" />
              <a href="" target="_blank">
                Pinterest
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-base font-semibold">Need help?</h1>
          <ul className="flex flex-col gap-2">
            <li className="text-xs text-muted-foreground">Buy a gift card</li>
            <li className="text-xs text-muted-foreground">Help Center</li>
            <li className="text-xs text-muted-foreground">
              Delivery & Returns
            </li>
            <li className="text-xs text-muted-foreground">Size Guide</li>
            <li className="text-xs text-muted-foreground">FAQs</li>
          </ul>
        </div>
        {isLoggedIn && (
          <div className="flex flex-col gap-4">
            <h1 className="text-base font-semibold">My Account</h1>
            <ul className="flex flex-col gap-2">
              <li className="text-xs text-muted-foreground">
                <Link to="/profile/my-wishlist">Wishlist</Link>
              </li>
              <li className="text-xs text-muted-foreground">
                <Link to="/profile/my-orders">Order History</Link>
              </li>
              <li className="text-xs text-muted-foreground">
                <Link to="/profile/my-details">My Details</Link>
              </li>
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <h1 className="text-base font-semibold">About gglamorous</h1>
          <ul className="flex flex-col gap-2">
            <li className="text-xs text-muted-foreground">About Us</li>
            <li className="text-xs text-muted-foreground">Store</li>
            <li className="text-xs text-muted-foreground">Privacy Policy</li>
            <li className="text-xs text-muted-foreground">
              Terms & Conditions
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-base font-semibold">Stay in the know</h1>
          <p className="text-xs text-muted-foreground">
            Be the first to hear about sales, new arrivals, and exclusive
            offers.
          </p>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-xs">
                Email Address
              </label>
              <input
                type="text"
                placeholder="Enter your email address"
                className="text-sm border-b border-black outline-none bg-transparent py-2"
              />
            </div>
            <button className="uppercase border border-black hover:bg-black hover:text-white py-2 transition-all duration-200 ease-in-out">
              Join us
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
