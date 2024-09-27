import {
  CashIcon,
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TiktokIcon,
} from "@/assets/Icons";

export default function Footer() {
  return (
    <div className="footer">
      <div className="bg-gray-100 flex justify-between p-16 px-8">
        <div className="flex flex-col gap-4">
          <h1>Let's Hang</h1>
          <ul className="flex flex-col gap-2">
            <li className="text-xs flex items-center gap-2 text-muted-foreground">
              <InstagramIcon size="size-5 text-black" />
              <a href="" target="_blank">
                Instagram
              </a>
            </li>
            <li className="text-xs text-muted-foreground flex items-center gap-2">
              <TiktokIcon size="size-5 text-black" />
              <a href="" target="_blank">
                Tiktok
              </a>
            </li>
            <li className="text-xs text-muted-foreground flex items-center gap-2">
              <FacebookIcon size="size-5 text-black" />
              <a href="" target="_blank">
                Facebook
              </a>
            </li>
            <li className="text-xs text-muted-foreground flex items-center gap-2">
              <PinterestIcon size="size-5 text-black" />
              <a href="" target="_blank">
                Pinterest
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h1>Need help?</h1>
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
        <div className="flex flex-col gap-4">
          <h1>My Account</h1>
          <ul className="flex flex-col gap-2">
            <li className="text-xs text-muted-foreground">Wishlist</li>
            <li className="text-xs text-muted-foreground">Order History</li>
            <li className="text-xs text-muted-foreground">My Details</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h1>About gglamorous</h1>
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
          <h1>Stay in the know</h1>
          <p className="text-xs text-muted-foreground">
            Be the first to hear about sales, new arrivals, and exclusive
            offers.
          </p>
          <form action="" className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-xs">
                Email Address
              </label>
              <input
                type="text"
                placeholder="Enter your email address"
                className="text-sm border-b border-b-black outline-none bg-transparent py-4"
              />
            </div>
            <button className="uppercase border border-black hover:bg-black hover:text-white py-2 transition-all duration-200 ease-in-out">
              join us
            </button>
          </form>
        </div>
      </div>
      <div className="flex gap-2 px-8 py-4 items-center">
        <p className="text-xs text-muted-foreground">We accept</p>
        <div className="flex gap-2">
          <img
            src="https://dev-cdn.esewa.com.np/ui/images/logos/esewa-icon-large.png"
            alt="esewa"
            width={24}
            className="aspect-square"
          />
          <img
            src="https://ictbyte.com/wp-content/uploads/2020/07/khalti-logo.png"
            alt="khalti"
            width={24}
            className="aspect-square"
          />
          <CashIcon size="text-green-600 size-6" />
        </div>
      </div>
    </div>
  );
}
