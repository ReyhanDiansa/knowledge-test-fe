"use client";

import api from "../../../utils/api";
import React, { useEffect, useState } from "react";
import showToast from "../../../utils/toast";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SpinnerLoading from "../../elements/Loading/spinnerLoading";
import Input from "../../elements/Form/input";
import TextArea from "../../elements/Form/textArea";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { customStyles } from "../../../utils/selectStyle";
import EditProductLoading from "../../../components/elements/Loading/editProductLoading";
import Select from "react-select";

const editProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);
  const [selectOption, setSelectOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDisable, setIsDisable] = useState(true);
  const { id } = useParams();

  const router = useRouter();

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category_id", selectedCategory?.value);
      if (image) {
        formData.append("image", image);
      }

      const response = await api.put(`/product/${id}`, formData);
      if (response?.data?.success) {
        setIsLoading(false);
        showToast("success", "Success Update Product");
        setTimeout(() => {
          router.push("/product");
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
    if (name && description && price && stock && selectedCategory) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };

  const findOne = async () => {
    try {
      setGetLoading(true);
      const response = await api.get(`/product/find/${id}`);
      if (response?.data?.success) {
        setGetLoading(false);
        setName(response?.data?.data?.name);
        setDescription(response?.data?.data?.description);
        setPrice(response?.data?.data?.price);
        setStock(response?.data?.data?.stock);
        setSelectedCategory({
          value: response?.data?.data?.category_id?._id,
          label: response?.data?.data?.category_id?.name,
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

  const findCategory = async () => {
    try {
      const response = await api.get(`/category/find-all`);
      if (response?.data?.success) {
        mapCategory(response?.data?.data);
      } else {
        showToast("error", response?.message);
      }
    } catch (error) {
      showToast("error", error?.response?.data?.message);
    }
  };

  const mapCategory = (data) => {
    const options = data.map((item) => ({
      value: item._id,
      label: item.name,
    }));
    setSelectOption(options);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChangeCategory = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  useEffect(() => {
    findOne();
    findCategory();
  }, []);

  useEffect(() => {
    disableButton();
  }, [name, description, price, stock, selectedCategory]);

  return (
    <div>
      <ToastContainer />
      <div>
        <Link
          href={"/product"}
          className="flex gap-1 items-center my-1 hover:text-blue-500 w-fit"
        >
          <FaArrowLeft />
          <p className="underline">Back To List</p>
        </Link>
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-primary">
            Update Product
          </h1>
        </div>

        <div className="my-3">
          {getLoading ? (
            <>
              <EditProductLoading />
            </>
          ) : (
            <div className=" flex md:flex-row flex-col md:flex-wrap gap-3 mt-5">
              <>
                <div className="md:w-4/12">
                  <Input
                    label="Name"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Product Name"
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
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="md:w-4/12">
                  <Input
                    label="Price"
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    withIcon={false}
                    width={"full"}
                  />
                </div>
                <div className="md:w-4/12">
                  <Input
                    label="Stock"
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Product Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    withIcon={false}
                    width={"full"}
                  />
                </div>
                <div className="md:w-4/12">
                  <Input
                    label="Image"
                    type="file"
                    id="image"
                    name="image"
                    placeholder="Product Image"
                    onChange={handleFileChange}
                    withIcon={false}
                    width={"full"}
                    required={false}
                  />
                </div>
                <div className="md:w-4/12">
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-900">
                      Category <span className="text-red-600">*</span>
                    </p>
                  </div>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    styles={customStyles}
                    isSearchable={true}
                    name="category"
                    options={selectOption}
                    onChange={handleChangeCategory}
                    value={selectedCategory}
                  />
                </div>
              </>
            </div>
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

export default editProduct;
