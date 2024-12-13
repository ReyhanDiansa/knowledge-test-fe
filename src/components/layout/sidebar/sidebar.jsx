"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MenuItem } from "./menuItem";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

const Sidebar = ({ isOpen }) => {
  const pathname = usePathname();

  const isActive = (item) => {
    return (
      (item.link === "/" && pathname === "/") ||
      (item.link !== "/" &&
        item.path.some((path) => pathname.startsWith(path)))
    );
  };

  return (
    <>
      <ToastContainer />
      <aside
        className={`bg-gray-50 mt-16 border-r-2 z-30 h-full w-64 fixed top-0 overflow-auto pb-20 left-0 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div>
          <ul>
            {MenuItem.map((item) => (
              <li key={item.link}>
                <Link
                  href={item.link}
                  className={`flex gap-2 my-3 p-4 items-center ${
                    isActive(item)
                      ? "bg-primary text-white"
                      : "hover:bg-light hover:text-black"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
