"use client";

import api from "../../../utils/api";
import React, { useEffect, useState } from "react";
import showToast from "../../../utils/toast";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SpinnerLoading from "../../elements/Loading/spinnerLoading";
import Input from "../../elements/Form/input";
import TextArea from "../../elements/Form/textArea";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

const addCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  const router = useRouter();

  const handleAdd = async () => {
    try {
      setIsLoading(true);
      const data = {
        name,
        description,
      };
      const response = await api.post(`/category`, data);
      if (response?.data?.success) {
        setIsLoading(false);
        showToast("success", "Success Add Category");
        setTimeout(() => {
          router.push("/category");
        }, 4000);
      } else {
        setIsLoading(false);
        showToast("error", response?.message);
      }
    } catch (error) {
      setIsLoading(false);
      showToast("error", error?.response?.data?.message);
    }
  };

  const disableButton = () => {
    if (name && description) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };

  useEffect(() => {
    disableButton();
  }, [name, description]);

  return (
    <div>
      <ToastContainer />
      <div>
        <Link href={"/category"} className="flex gap-1 items-center my-1 hover:text-blue-500">
          <FaArrowLeft />
          <p className="underline">Back To List</p>
        </Link>
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-primary">Add Category</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-5">
          <div className="md:w-4/12">
            <Input
              label="Name"
              type="text"
              id="name"
              name="name"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              withIcon={false}
              width={"full"}
            />
          </div>
          <div className="md:w-4/12">
            <TextArea
              withIcon={false}
              label="Description"
              id="description"
              name="description"
              placeholder="Category Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <button
          className={`flex gap-2 text-white items-center  py-2 px-4 rounded-md transform transition-transform duration-300 ${
            isDisable ? "cursor-not-allowed bg-slate-400" : "bg-primary"
          }`}
          onClick={handleAdd}
          disabled={isDisable}
        >
          {isLoading && <SpinnerLoading withText={false} />} Submit
        </button>
      </div>
    </div>
  );
};

export default addCategory;
