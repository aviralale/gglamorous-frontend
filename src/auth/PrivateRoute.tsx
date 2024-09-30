import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
