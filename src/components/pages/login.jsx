"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RiLockFill } from "react-icons/ri";
import SpinnerLoading from "../elements/Loading/spinnerLoading";
import { useRouter } from "next/navigation";
import Input from "../elements/Form/input";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import api from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordInput from "../elements/Form/passwordInput";
import showToast from "../../utils/toast";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleLogin = async () => {
    setIsLoading(true);
    const userData = {
      email,
      password,
    };
    try {
      const loginResponse = await api.post("/user/login", userData);

      if (loginResponse.data.success) {
        const token = loginResponse.data.data;
        setCookie("knwtest-token", token);
        setIsLoading(false);
        showToast("success", "Login Successfully!");

        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setIsLoading(false);
        showToast("error", loginResponse?.message);
      }
    } catch (error) {
      setIsLoading(false);
      showToast("error", error?.response?.data?.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className=" h-full  md:mx-0 flex justify-center items-center">
        <div className="bg-white rounded-md flex  px-4 md:px-5 py-7 shadow-md  md:w-7/12 md:h-4/6 divide-x  divide-gray-200">
          <div className="md:w-6/12 my-auto">
            <div className="mx-auto ">
              <p className="text-center text-2xl font-semibold text-primary">
                LOGIN
              </p>
              <p className="text-xs text-center  mx-auto w-10/12 md:w-full">
                Access your account and explore personalized features
              </p>
            </div>
            <div className="mx-auto mt-6 flex flex-col items-center  w-full">
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<MdEmail />}
              />
              <div className="mt-3">
                <PasswordInput
                  label="Password"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<RiLockFill />}
                />
              </div>
              <button
                className="flex gap-2 text-white items-center bg-primary py-2 px-4 rounded-md"
                onClick={handleLogin}
              >
                {isLoading && <SpinnerLoading withText={false} />} Log In
              </button>
              <p className="text-xs w-11/12 mx-auto md:w-full text-center mt-1">
                Don’t have an account? Click{" "}
                <Link href={"/register"}>
                  <span className="text-blue-500">Register </span>
                </Link>
                to get started!
              </p>
            </div>
          </div>
          <div className="hidden md:block md:w-6/12">
            <div className="flex h-full justify-center items-center">
              <Image
                src={"/asset/images/login_illustration.svg"}
                width={350}
                height={350}
                alt="login illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
