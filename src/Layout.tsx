import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "./comps/Navbar";
import CategoriesNav from "./comps/CategoriesNav";
import Footer from "./comps/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./auth/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  // Array of public paths that don't require authentication
  const publicPaths = ["/login", "/register"];
  const isPublicPath = publicPaths.includes(location.pathname);

  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <div className="fixed z-10 w-full bg-white">
        <Navbar />
        <CategoriesNav />
      </div>

      {isLoggedIn || isPublicPath ? (
        <div className={`${isPublicPath ? "" : "pt-44"}`}>{children}</div>
      ) : (
        <div className="flex flex-col items-center gap-4 justify-center py-44">
          <h1 className="text-5xl text-center ">
            You need to login to access contents.
          </h1>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 border border-black transition-colors hover:bg-black hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-white bg-black hover:bg-black/80 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
    </div>
  );
}
