import Image from "next/image";
import logo from "../assets/logo/Tube.png";
import SearchBox from "./SearchBox";
import DownloadDropDown from "./DownloadDropDown";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md px-4 py-2">
      <Image className="w-20" src={logo} alt="logo"></Image>
      <SearchBox></SearchBox>
      <div className="flex items-center space-x-4">
        <DownloadDropDown></DownloadDropDown>
        <NavMenu></NavMenu>
      </div>
    </div>
  );
};

export default Header;
