import React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    // <div className="relative">
      <footer className="mt-auto w-full h-full py-5 bg-[#b62024] text-white ">
        <div className="container mx-auto h-full flex flex-col justify-center items-center">
          <div className="flex justify-center items-center gap-8 py-4 text-xl">
            <Link href="https://www.instagram.com/smktelkommalang/">
              <FaInstagram className="cursor-pointer" />
            </Link>
            <Link href="https://www.youtube.com/@smktsmalang/featured">
              <BsYoutube className="cursor-pointer" />
            </Link>
          </div>

          <div className="flex justify-center items-center gap-10 my-4">
          <h4>
            <Link href="/tatib" className="text-white">
              Beranda
            </Link>
          </h4>
          <h4>
            <Link href="/tatib/lapor" className="text-white">
              Lapor
            </Link>
          </h4>
        </div>

          <div className="text-center mt-6">
            Copyright <span className="font-semibold">SMK TELKOM MALANG</span> © {year}
          </div>
        </div>
      </footer>
    // </div>
  );
};

export default Footer;