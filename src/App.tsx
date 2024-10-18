import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Profile from "./pages/Profile";
import MyDetails from "./comps/Profile/MyDetails";
import ChangePassword from "./comps/Profile/ChangePassword";
import AddressBook from "./comps/Profile/AddressBook";
import MyOrders from "./comps/Profile/MyOrders";
import MyWishList from "./comps/Profile/MyWishList";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>
            {/* Profile Route */}
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />}>
              <Route element={<PrivateRoute />}>
                <Route index element={<Navigate to="my-details" replace />} />
                <Route path="my-details" element={<MyDetails />} />
                <Route path="change-password" element={<ChangePassword />} />
                <Route path="address-book" element={<AddressBook />} />
                <Route path="my-orders" element={<MyOrders />} />
                <Route path="my-wishlist" element={<MyWishList />} />
              </Route>
            </Route>
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}
