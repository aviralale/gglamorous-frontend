import { ReactNode } from "react";
import Navbar from "./comps/Navbar";
import CategoriesNav from "./comps/CategoriesNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <CategoriesNav />
      <div>{children}</div>
    </>
  );
}