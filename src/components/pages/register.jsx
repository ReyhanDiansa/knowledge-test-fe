"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiLockFill } from "react-icons/ri";
import SpinnerLoading from "../elements/Loading/spinnerLoading";
import { useRouter } from "next/navigation";
import Input from "../elements/Form/input";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { FcOk } from "react-icons/fc";
import { FaUser } from "react-icons/fa6";
import PasswordInput from "../elements/Form/passwordInput";
import { ToastContainer } from "react-toastify";
import api from "../../utils/api";
import {
  hasCapitalLetter,
  hasNumber,
  isLengthValid,
  sameWithConfirm,
  validatePassword,
} from "../../utils/validate";
import { IoMdCloseCircle } from "react-icons/io";
import { TbLockCheck } from "react-icons/tb";
import showToast from "../../utils/toast";
import Select from "../elements/Form/select";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [numberRule, setNumber] = useState(false);
  const [lengthRule, setLength] = useState(false);
  const [capitalRule, setCapital] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [selectedGender, setSelectedGender] = useState("");

  const router = useRouter();
  const handleRegister = async () => {
    setIsLoading(true);
    const confirm = sameWithConfirm(password, passwordConfirmation);
    if (!confirm) {
      setIsLoading(false);
      showToast(
        "error",
        "Your confirmation password does not match the password"
      );
    }

    const validate = validatePassword(password);
    if (!validate) {
      setIsLoading(false);
      showToast("error", "Your password does not match the required criteria");
    }

    if (confirm && validate) {
      const userData = {
        name,
        email,
        password,
        gender:selectedGender
      };
      try {
        const registerResponse = await api.post("/user/register", userData);

        if (registerResponse.data.success) {
          setIsLoading(false);
          showToast("success", "Register Successfully!");

          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          setIsLoading(false);
          showToast("error", registerResponse?.message);
        }
      } catch (error) {
        setIsLoading(false);
        showToast("error", error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    const length = isLengthValid(password);
    if (length) {
      setLength(true);
    } else {
      setLength(false);
    }

    const capital = hasCapitalLetter(password);
    if (capital) {
      setCapital(true);
    } else {
      setCapital(false);
    }

    const number = hasNumber(password);
    if (number) {
      setNumber(true);
    } else {
      setNumber(false);
    }
    disableButton();
  }, [password, passwordConfirmation]);

  useEffect(() => {
    disableButton();
  }, [name, email, selectedGender]);

  const disableButton = () => {
    if (
      password &&
      validatePassword(password) &&
      sameWithConfirm(password, passwordConfirmation) &&
      name &&
      email &&
      selectedGender
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSelectedGender(event.target.value);
  };

  const genderOptions = [
    { value: "", label: "Pilih Jenis Kelamin" },
    { value: "laki-laki", label: "Laki-laki" },
    { value: "perempuan", label: "Perempuan" },
  ];

  return (
    <>
      <ToastContainer />
      <div className=" h-full  md:mx-0 flex justify-center items-center">
        <div className="bg-white rounded-md flex  px-5 py-5 shadow-md md:w-8/12 md:h-[81.5%] divide-x  divide-gray-200">
          <div className="md:w-6/12 my-auto">
            <div className="mx-auto">
              <p className="text-center text-2xl font-semibold text-primary">
                Register
              </p>
            </div>
            <div className="mx-auto flex flex-col items-center  w-full">
              <div className="mt-3">
                <Input
                  label="Name"
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={<FaUser />}
                  withBottommargin={false}
                />
              </div>
              <div className="mt-1">
                <Input
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<MdEmail />}
                  withBottommargin={false}
                />
              </div>
              <div className="mt-3">
                <Select
                  name="Jenis Kelamin"
                  label="Pilih jenis kelamin"
                  id="gender"
                  options={genderOptions}
                  value={selectedGender}
                  onChange={handleSelectChange}
                />
              </div>
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
                  withBottommargin={false}
                  widthResponsive="80"
                />
                {password && (
                  <div className="mt-1">
                    <div className="flex items-center gap-2">
                      {" "}
                      {lengthRule ? (
                        <FcOk />
                      ) : (
                        <IoMdCloseCircle className="text-red-600" />
                      )}{" "}
                      <p className="text-xs">Minimum 8 length</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {" "}
                      {capitalRule ? (
                        <FcOk />
                      ) : (
                        <IoMdCloseCircle className="text-red-600" />
                      )}{" "}
                      <p className="text-xs">Minimum 1 Capital Letter</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {" "}
                      {numberRule ? (
                        <FcOk />
                      ) : (
                        <IoMdCloseCircle className="text-red-600" />
                      )}{" "}
                      <p className="text-xs">Contain Number</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <PasswordInput
                  label="Password Confirmation"
                  type="password"
                  id="password-confirm"
                  name="password-confirm"
                  placeholder="Password Confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  icon={<TbLockCheck className="text-lg" />}
                  withBottommargin={false}
                  widthResponsive="80"
                />
              </div>
              <button
                className={`mt-5 flex gap-2 text-white items-center  py-2 px-4 rounded-md transform transition-transform duration-300 ${
                  isDisable ? "cursor-not-allowed bg-slate-400" : "bg-primary"
                }`}
                onClick={handleRegister}
                disabled={isDisable}
              >
                {isLoading && <SpinnerLoading withText={false} />} Register
              </button>
              <p className="text-xs mt-1">
                Already have an account? Click{" "}
                <Link href={"/login"}>
                  <span className="text-blue-500">Login </span>
                </Link>
                to get started!
              </p>
            </div>
          </div>
          <div className="hidden md:block md:w-6/12">
            <div className="flex h-full justify-center items-center">
              <Image
                src={"/asset/images/register_illustration.svg"}
                width={350}
                height={350}
                alt="register illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
