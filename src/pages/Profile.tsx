import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/comps/Profile/Sidebar";

interface LayoutProps {
  children?: ReactNode;
}

export default function Profile({ children }: LayoutProps) {
  return (
    <div className="flex">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 p-16">{children || <Outlet />}</div>
    </div>
  );
}
