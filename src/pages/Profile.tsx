import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/comps/Profile/Sidebar";
import { Card, CardContent } from "@/components/ui/card";

interface LayoutProps {
  children?: ReactNode;
}

const Profile: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-between gap-8">
      <div className="w-1/5">
        <Card className="sticky top-4 h-fit">
          <CardContent>
            <Sidebar />
          </CardContent>
        </Card>
      </div>
      <div className="w-4/5 py-8">
        {children || (
          <Card>
            <CardContent>
              <Outlet />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
