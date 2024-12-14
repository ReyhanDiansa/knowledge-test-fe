"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../layout/sidebar/sidebar";
import Header from "../layout/header/header";
import { getCookie } from "../../utils/cookie";
import jwt from "jsonwebtoken";
import { withAuth } from "../../utils/authenticationMiddleware";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setToken(getCookie("knwtest-token"));
    if (token) {
      const data = jwt.decode(token);
      setUserData(data);
    }
  }, [token]);

  return (
    <>
      <div className="bg-gray-50">
        <div className="sticky top-0 z-20 w-full flex center h-[5rem]">
          <Header toggleSidebar={toggleSidebar} userData={userData} />
        </div>
        <div className="flex min-h-screen ">
          <div
            className={`z-10 ${
              sidebarOpen ? "h-screen lg:w-[20%]" : "h-fit lg:h-screen"
            }  fixed pb-[5rem]`}
          >
            <div className={`${sidebarOpen ? "w-full h-full" : ""}`}>
              <Sidebar isOpen={sidebarOpen} />
            </div>
          </div>
          <div
            className={`${
              sidebarOpen ? "ml-0 md:ml-[20%] mx-5" : ""
            } w-full p-3  md:mt-16 lg:mt-0 z-1 md:mx-10`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Layout);
