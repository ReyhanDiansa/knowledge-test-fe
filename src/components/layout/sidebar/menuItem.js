import { AiFillHome, AiFillProduct } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

export const MenuItem = [
  {
    name: "Dashboard",
    link: "/",
    path: ["/"],
    icon: <AiFillHome />,
  },
  {
    name: "Product",
    link: "/product",
    path: [
      "/product",
      "/product/add",
      "/product/edit",
    ],
    icon: <AiFillProduct />,
  },
  {
    name: "Category",
    link: "/category",
    path: [
      "/category",
      "/category/add",
      "/category/edit",
    ],
    icon: <MdCategory />,
  },
  {
    name: "Profile",
    link: "/profile",
    path: [
      "/profile"
    ],
    icon: <FaUserAlt />,
  },
];
