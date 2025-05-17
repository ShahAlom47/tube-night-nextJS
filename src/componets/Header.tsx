import Image from "next/image";
import logo from "../assets/logo/Tube.png";
import SearchBox from "./SearchBox";
import DownloadDropDown from "./DownloadDropDown";
import NavMenu from "./NavMenu";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md px-4 py-2">
   <Link href="/" className="flex items-center">
      <Image className="w-20" src={logo} alt="logo"></Image>
    </Link>


      <SearchBox></SearchBox>
      <div className="flex items-center space-x-4">
        <DownloadDropDown></DownloadDropDown>
        <NavMenu></NavMenu>
      </div>
    </div>
  );
};

export default Header;
