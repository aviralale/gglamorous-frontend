import { ReactNode } from "react";
import Navbar from "./comps/Navbar";
import CategoriesNav from "./comps/CategoriesNav";
import Footer from "./comps/Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="fixed z-10 w-full bg-white">
        <Navbar />
        <CategoriesNav />
      </div>
      <div className="pt-44">{children}</div>
      <Footer />
    </>
  );
}
