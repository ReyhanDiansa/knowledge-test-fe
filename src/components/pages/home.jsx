"use client";

import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { getCookie } from "../../utils/cookie";
import Image from "next/image";
import showToast from "../../utils/toast";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import api from "../../utils/api";

const Home = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");
  const [countData, setCountData] = useState([]);

  const findCount = async () => {
    try {
      const response = await api.get(`/statistic/get-count`);
      if (response?.data?.success) {
        setCountData(response?.data?.data);
      } else {
        showToast("error", response?.message);
      }
    } catch (error) {
      showToast("error", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setToken(getCookie("knwtest-token"));
    if (token) {
      const data = jwt.decode(token);
      setUserData(data);
    }
  }, [token]);

  useEffect(() => {
    findCount();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="mx-auto">
        <div className="flex justify-center items-center gap-3">
          <p className="text-center text-2xl flex md:flex-row flex-col gap-2 justify-center items-center">
            Welcome{" "}
            <span className="flex text-3xl text-primary font-semibold underline">
              {userData.name}
              <Image
                src="/asset/gif/Hi.gif"
                width={35}
                height={30}
                alt="halo-gif"
              />
            </span>
          </p>
        </div>
        <div className="mt-2">
          <p className="text-center">
            Organize and manage your products with just a few clicks on{" "}
            <span className="italic text-primary font-semibold">
              KelolaProduk
            </span>
          </p>
        </div>
        <div className="flex  md:flex-row flex-col md:flex-wrap gap-3 justify-center items-center my-4">
          <div className="flex justify-between bg-yellow-50 rounded-md shadow-md px-3 py-4 gap-10 w-9/12 md:w-[23%]">
            <div>
              <p className="mb-3 text-3xl font-bold">
                {countData?.total_product || 0}
              </p>
              <p>Products</p>
            </div>
            <div className="flex items-end">
              <AiFillProduct className="text-4xl" />
            </div>
          </div>
          <div className="flex justify-between bg-green-50 rounded-md shadow-md px-3 py-4 gap-10 w-9/12 md:w-[23%]">
            <div>
              <p className="mb-3 text-3xl font-bold">
                {countData?.total_category || 0}
              </p>
              <p>Categories</p>
            </div>
            <div className="flex items-end">
              <MdCategory className="text-4xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
