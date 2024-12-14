"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Input from "../elements/Form/input";
import { customStyles } from "../../utils/selectStyle";
import jwt from "jsonwebtoken";
import { getCookie } from "../../utils/cookie";
import Select from "react-select";
import showToast from "../../utils/toast";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import api from "../../utils/api";
import PasswordInput from "../elements/Form/passwordInput";
import { FcOk } from "react-icons/fc";
import { IoMdCloseCircle } from "react-icons/io";
import {
  hasCapitalLetter,
  hasNumber,
  isLengthValid,
  sameWithConfirm,
  validatePassword,
} from "../../utils/validate";
import SpinnerLoading from "../elements/Loading/spinnerLoading";
import ProfileLoading from "../elements/Loading/profileLoading";
import { FaCircleInfo } from "react-icons/fa6";

const Profile = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [token, setToken] = useState("");
  const [getLoading, setGetLoading] = useState(true);
  const [numberRule, setNumber] = useState(false);
  const [lengthRule, setLength] = useState(false);
  const [capitalRule, setCapital] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const findOne = async () => {
    try {
      setGetLoading(true);
      const response = await api.get(`/user/find/${userId}`);
      if (response?.data?.success) {
        setGetLoading(false);
        setName(response?.data?.data?.name);
        setEmail(response?.data?.data?.email);
        setSelectedGender({
          value: response?.data?.data?.gender,
          label:
            response?.data?.data?.gender === "laki-laki"
              ? "Laki-laki"
              : "Perempuan",
        });
      } else {
        setGetLoading(false);
        showToast("error", response?.message);
      }
    } catch (error) {
      setGetLoading(false);
      showToast("error", error?.response?.data?.message);
    }
  };

  const genderSelectOption = [
    {
      value: "laki-laki",
      label: "Laki-laki",
    },
    {
      value: "perempuan",
      label: "Perempuan",
    },
  ];

  const handleChangeGender = (selectedOption) => {
    setSelectedGender(selectedOption);
  };
  useEffect(() => {
    setToken(getCookie("knwtest-token"));
    if (token) {
      const data = jwt.decode(token);
      setUserId(data?.id);
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      findOne();
    }
  }, [userId]);

  const handleUpdate = async () => {
    setIsLoading(true);
    if (password) {
      const validate = validatePassword(password);
      if (!validate) {
        setIsLoading(false);
        showToast(
          "error",
          "Your password does not match the required criteria"
        );
        return;
      }
    }

    const confirm = sameWithConfirm(password, passwordConfirmation);
    if (!confirm) {
      setIsLoading(false);
      showToast(
        "error",
        "Your confirmation password does not match the password"
      );
      return;
    }

    const userData = {
      name,
      email,
      gender: selectedGender?.value,
    };

    if (password) {
      userData.password = password;
    }

    try {
      const registerResponse = await api.put(`/user/${userId}`, userData);

      if (registerResponse.data.success) {
        setIsLoading(false);
        showToast("success", "Success Update Profile");

        setTimeout(() => {
          findOne();
        }, 3000);
      } else {
        setIsLoading(false);
        showToast("error", registerResponse?.message);
      }
    } catch (error) {
      setIsLoading(false);
      showToast("error", error?.response?.data?.message);
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
    if (name && email && selectedGender) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };

  return (
    <div className="rounded-md shadow-md p-5">
      <ToastContainer />
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-primary">Profile</h1>{" "}
      </div>
      <div className="flex flex-col md:flex-row md:gap-7 md:items-center gap-2 md:justify-between">
        {getLoading ? (
          <ProfileLoading />
        ) : (
          <>
            <div className="md:w-fit">
              <Image
                src={"/asset/images/dummy-profile.jpg"}
                width={200}
                height={200}
                alt={"user-dummy-foto"}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-wrap md:w-7/12 flex-col md:flex-row gap-3 ">
              <div className="md:w-5/12">
                <Input
                  label="Name"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  withIcon={false}
                  width={"full"}
                />
              </div>
              <div className="md:w-5/12">
                <Input
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  withIcon={false}
                  width={"full"}
                />
              </div>
              <div className="md:w-8/12">
                <div>
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-900">Gender</p>
                  </div>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    styles={customStyles}
                    isSearchable={true}
                    name="category"
                    options={genderSelectOption}
                    onChange={handleChangeGender}
                    value={selectedGender}
                  />
                </div>
                <div className="hidden md:block w-full">
                  <button
                    className={`mt-5 hidden md:flex gap-2 text-white items-center  py-2 px-4 rounded-md transform transition-transform duration-300 ${
                      isDisable
                        ? "cursor-not-allowed bg-slate-400"
                        : "bg-primary"
                    }`}
                    onClick={handleUpdate}
                    disabled={isDisable}
                  >
                    {isLoading && <SpinnerLoading withText={false} />} Update
                  </button>
                  <div className="hidden md:flex gap-1 items-center mt-2">
                    <FaCircleInfo className="text-gray-500" />
                    <p className="text-xs text-gray-500">
                      After updating, please log in again so that your data is
                      updated!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="shadow-md px-3 flex items-center h-60 rounded-md border-1 border-primary md:w-fit">
          <div className="my-auto">
            <p className="text-xs text-gray-500">
              Fill in only if you want to update your password
            </p>
            <div className="">
              <PasswordInput
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                withBottommargin={false}
                withIcon={false}
                //   withLabel={false}
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
            <div className="mt-2">
              <PasswordInput
                label="Password Confirmation"
                type="password"
                id="password-confirm"
                name="password-confirm"
                placeholder="Password Confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                withBottommargin={false}
                withIcon={false}
                //   withLabel={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <button
          className={`mt-5 md:hidden gap-2 text-white items-center  py-2 px-4 rounded-md transform transition-transform duration-300 w-fit flex ${
            isDisable ? "cursor-not-allowed bg-slate-400" : "bg-primary"
          }`}
          onClick={handleUpdate}
          disabled={isDisable}
        >
          {isLoading && <SpinnerLoading withText={false} />} Update
        </button>
        <div className="flex gap-1 items-center mt-2">
          <FaCircleInfo className="text-gray-500" />
          <p className="text-xs text-gray-500">
            After updating, please log in again so that your data is updated!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
