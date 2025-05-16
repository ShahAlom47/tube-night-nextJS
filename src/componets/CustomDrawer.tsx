"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React from "react";

interface DrawerProps {
  trigger: React.ReactNode; // ✅ trigger হিসাবে button বা icon
  children: React.ReactNode;
  className?: string;
  title:string;
  direction?: "left" | "right" | "top" | "bottom"; // ✅ drawer এর দিক
}

const CustomDrawer = ({ trigger, children,title, className ,direction }: DrawerProps) => {
  return (
    <Drawer direction={direction || "right"}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
       <DrawerContent direction={direction || "right"} className={className}>
        <DrawerTitle className="text-lg font-semibold px-4  border-b-2">
         {title}
        </DrawerTitle>
        <div className="p-4">{children}</div>
        <div className="p-4 w-full">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
