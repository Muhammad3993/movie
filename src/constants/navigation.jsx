import { MdHomeFilled } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

export const navigation = [
    {
      title: "TV Shows",
      href: "tv",
      icon: <PiTelevisionFill/>
    },
    {
      title: "Movies",
      href: "movie",
      icon: <BiSolidMoviePlay/>
    }
  ]
  
  export const mobileNavigation = [
    {
      title: "Home",
      href: "/",
      icon: <MdHomeFilled/>
    },
    ...navigation,
    {
        title: "Search",
        href: "/search",
        icon: <IoSearchOutline/>
    }
  ]