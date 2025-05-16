"use client";
import { HiOutlineDotsVertical } from "react-icons/hi";
import CustomDrawer from "./CustomDrawer";

const NavMenu = () => {
  return (
    <div>
      <CustomDrawer
      className="w-[30%]"
        title="Menu"
        trigger={
          <button className="text-xl hover:scale-110 ">
            <HiOutlineDotsVertical />
          </button>
        }
      >
        <h1 className="text-lg font-bold">Drawer Content</h1>
        <p>This is the drawer body.</p>
      </CustomDrawer>
    </div>
  );
};

export default NavMenu;
