"use client";

import api from "../../../utils/api";
import React, { useEffect, useState } from "react";
import showToast from "../../../utils/toast";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SpinnerLoading from "../../elements/Loading/spinnerLoading";
import SkeletonInput from "../../elements/Loading/inputSkeleton";
import Input from "../../elements/Form/input";
import TextArea from "../../elements/Form/textArea";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

const editCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const { id } = useParams();

  const router = useRouter();

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const data = {
        name,
        description,
      };
      const response = await api.put(`/category/${id}`, data);
      if (response?.data?.success) {
        setIsLoading(false);
        showToast("success", "Success Update Category");
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

  const findOne = async () => {
    try {
      setGetLoading(true);
      const response = await api.get(`/category/find/${id}`);
      if (response?.data?.success) {
        setGetLoading(false);
        setName(response?.data?.data?.name);
        setDescription(response?.data?.data?.description);
      } else {
        setGetLoading(false);
        showToast("error", response?.message);
      }
    } catch (error) {
      setGetLoading(false);
      showToast("error", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    findOne();
  }, []);

  useEffect(() => {
    disableButton();
  }, [name, description]);

  return (
    <div>
      <ToastContainer />
      <div>
        <Link
          href={"/category"}
          className="flex gap-1 items-center my-1 hover:text-blue-500"
        >
          <FaArrowLeft />
          <p className="underline">Back To List</p>
        </Link>
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-primary">
            Update Category
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-5">
          {getLoading && !name && !description ? (
            <>
              <div className="space-y-4 md:w-4/12 mb-3">
                <SkeletonInput width="3/4" height="4" />
                <SkeletonInput width="full" height="12" />
              </div>
              <div className="space-y-4 md:w-4/12 mb-3">
                <SkeletonInput width="3/4" height="4" />
                <SkeletonInput width="full" height="14" />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        <button
          className={`flex gap-2 text-white items-center  py-2 px-4 rounded-md transform transition-transform duration-300 ${
            isDisable ? "cursor-not-allowed bg-slate-400" : "bg-primary"
          }`}
          onClick={handleEdit}
          disabled={isDisable}
        >
          {isLoading && <SpinnerLoading withText={false} />} Submit
        </button>
      </div>
    </div>
  );
};

export default editCategory;
