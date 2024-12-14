"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "../../../utils/cookie";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";

const Header = ({ toggleSidebar, userData }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();

  const handleLogOut = () => {
    try {
      deleteCookie("knwtest-token");
      router.push("/login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <header className="bg-gray-50 border-b-2 p-4 py-2 flex justify-between gap-16 text-center md:gap-0 items-center fixed z-20 w-full">
      <div className="flex gap-5 items-center">
        <button onClick={toggleSidebar} className="text-2xl text-primary">
          ☰
        </button>
        <Link
          href={"/"}
          className="text-md md:text-xl font-semibold text-primary flex items-center gap-1"
        >
          <Image src="/asset/logo/icon.svg" width={50} height={40} alt="logo" />
          KelolaProduk
        </Link>
      </div>
      <div className="text-md md:text-xl font-semibold text-primary">
        <section className="relative">
          <div className="bg-white rounded-full p-1 w-8/12">
            <Image
              src={"/asset/images/dummy-profile.jpg"}
              width={50}
              height={50}
              className="rounded-full cursor-pointer border-2 border-primary"
              onClick={() => setOpenDropdown(!openDropdown)}
              alt="profile-dummy-photo"
            />
          </div>
          {openDropdown && (
            <div className="absolute w-[10rem] top-12 text-black right-6 bg-white p-2 rounded-b-md rounded-tl-md border-2">
              <div className="py-3  border-b-2 border-black">
                <h1 className="font-semibold text-sm">{userData.name}</h1>
                <p className="text-gray-500 break-words text-xs">
                  {" "}
                  {userData.email}
                </p>
              </div>
              <div
                className="flex py-2 gap-1 items-center justify-center hover:bg-light cursor-pointer my-2 hover:rounded-lg"
                onClick={handleLogOut}
              >
                <CiLogout className="text-lg" />
                <p className="text-sm">Logout</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </header>
  );
};

export default Header;
