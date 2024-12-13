"use client";

import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { getCookie } from "../../utils/cookie";
import Image from "next/image";

const Home = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    setToken(getCookie("knwtest-token"));
    if (token) {
      const data = jwt.decode(token);
      setUserData(data);
    }
  }, [token]);

  return (
    <div className="mx-auto">
      <div className="flex justify-center items-center gap-3">
        <p className="text-center text-2xl">
          Selamat Datang{" "}
          <span className="text-3xl text-primary font-semibold underline">
            {userData.name}
          </span>
        </p>

        <Image src="/asset/gif/Hi.gif" width={30} height={30} alt="halo-gif"/>
      </div>
      <div className="mt-2">
        <p className="text-center">Atur dan kelola produk Anda hanya dengan beberapa klik di <span className="italic text-primary font-semibold">KelolaProduk</span></p>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Home;
