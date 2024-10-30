import { CartIcon } from "@/assets/Icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Cart from "./Cart";
import Wishlist from "./WishList";
import { useCart } from "@/contexts/CartContext";
import { useWishList } from "@/contexts/WishListContext";

export default function CartandWishlist() {
  const { cart } = useCart();
  const { wishList } = useWishList();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="p-0 relative">
          <CartIcon />
          <span className="absolute top-0 -right-1 text-xs font-semibold">
            {cart?.items
              ? wishList?.wishlist_items
                ? cart?.items.length + wishList?.wishlist_items.length
                : cart?.items?.length
              : 0}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="grid gap-4 py-4">
          <Tabs defaultValue="cart" className="py-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cart">Your Cart</TabsTrigger>
              <TabsTrigger value="wishlist">WishList</TabsTrigger>
            </TabsList>
            <TabsContent value="cart">
              <Cart />
            </TabsContent>
            <TabsContent value="wishlist">
              <Wishlist />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
