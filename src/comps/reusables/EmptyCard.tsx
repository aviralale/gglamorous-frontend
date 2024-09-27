import React from "react";
import { ShoppingCartIcon } from "@/assets/Icons";

interface EmptyCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function EmptyCard({
  icon = <ShoppingCartIcon />,
  title,
  description,
  className = "",
}: EmptyCardProps) {
  return (
    <div
      className={`bg-gray-200 p-8 flex justify-center items-center flex-col ${className}`}
    >
      {icon}
      <p className="text-sm mt-4">{title}</p>
      <p className="text-xs text-muted-foreground mt-2">{description}</p>
    </div>
  );
}
