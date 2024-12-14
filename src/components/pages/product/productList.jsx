"use client";

import api from "../../../utils/api";
import React, { useEffect, useState } from "react";
import showToast from "../../../utils/toast";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { FaInfoCircle, FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import { Pagination } from "@nextui-org/react";
import SpinnerLoading from "../../elements/Loading/spinnerLoading";
import Input from "../../elements/Form/input";
import { debounce } from "lodash";
import Modal from "../../elements/Modal/modal";
import ProductModal from "../../elements/Modal/productModal";
import { formatRupiah } from "../../../utils/formatter";

const productList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [idToShow, setIdToShow] = useState("");

  const getData = async (keyword = searchKeyword, page = currentPage) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/product?page=${page}&name=${keyword}`);
      if (response?.data?.success) {
        setIsLoading(false);
        setProducts(response?.data?.data);
      } else {
        setProducts([]);
        setIsLoading(false);
        showToast("error", response?.message);
      }
    } catch (error) {
      setProducts([]);
      setIsLoading(false);
      showToast("error", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  const debouncedSearch = debounce((keyword) => {
    getData(keyword, 1);
    setCurrentPage(1);
  }, 1000);

  useEffect(() => {
    debouncedSearch(searchKeyword);
    return () => debouncedSearch.cancel();
  }, [searchKeyword]);

  const changePage = (p) => {
    setCurrentPage(p);
  };

  const openModal = (id) => {
    setIdToDelete(id);
    setIsModalOpen(true);
  };

  const openModalDetail = (id) => {
    setIdToShow(id);
    setIsModalDetailOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalDetailOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/product/${idToDelete}`);
      if (response?.data?.success) {
        showToast("success", "Success delete item");
        setIsModalOpen(false);
        getData(searchKeyword, 1);
        setCurrentPage(1);
      } else {
        showToast("error", response?.message);
      }
    } catch (error) {
      showToast("error", error?.response?.data?.message);
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h1 className="text-2xl font-semibold text-primary">
              Product List
            </h1>
            <div className="flex md:mt-0 mt-3 flex-col-reverse md:flex-row gap-2">
              <Input
                withLabel={false}
                type="text"
                id="search"
                name="search"
                placeholder="Search....."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                icon={<FaSearch />}
              />
              <Link
                href="/product/add"
                className="text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 focus:outline-none flex gap-2 w-fit items-center"
              >
                <FaPlus />
                <span className="">Add Product</span>
              </Link>
            </div>
          </div>

          <div className="my-5">
            <div className="relative overflow-x-auto shadow-md rounded-md">
              <table className="w-full text-sm text-left rtl:text-right text-gray-800 overflow-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-2/12">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 w-2/12">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 w-2/12">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 w-2/12">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 w-2/12">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 w-2/12">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center px-6 py-7 font-bold"
                      >
                        <SpinnerLoading withText={true} />
                      </td>
                    </tr>
                  ) : products?.items?.length > 0 && !isLoading ? (
                    products?.items?.map((item, index) => (
                      <tr
                        className={`border-b hover:bg-gray-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-light"
                        }`}
                        key={index}
                      >
                        <td className="px-6 py-4">{item?.name}</td>
                        <td className="px-6 py-4">{item?.description}</td>
                        <td className="px-6 py-4">{formatRupiah(item?.price)}</td>
                        <td className="px-6 py-4">{item?.stock}</td>
                        <td className="px-6 py-4">{item?.category_id?.name}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button
                            className="text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 focus:outline-none flex gap-2 w-fit items-center"
                            onClick={() => openModalDetail(item._id)}
                          >
                            <FaInfoCircle />
                            <span className="">Detail</span>
                          </button>
                          <Link
                            href={`/product/edit/${item._id}`}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 focus:outline-none flex gap-2 w-fit items-center"
                          >
                            <MdEdit />
                            <span className="">Edit</span>
                          </Link>
                          <button
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 focus:outline-none flex gap-2 w-fit items-center"
                            onClick={() => openModal(item._id)}
                          >
                            <FaTrashAlt />
                            <span className="">Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center p-1 font-bold">
                        No data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {products?.items && (
              <div className="flex justify-end mt-10">
                <Pagination
                  showControls
                  total={products?.meta?.total_pages}
                  initialPage={1}
                  classNames={{
                    item: "font-bold",
                  }}
                  page={currentPage}
                  onChange={(p) => changePage(p)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Delete Confirmation"
          withClose={false}
        >
          <div className="my-3">
            <p className="text-center text-2xl ">
              Are you sure want to delete this item?
            </p>
          </div>
          <div className="flex justify-center gap-2">
            <button
              className="text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 focus:outline-none flex gap-2 w-fit items-center"
              onClick={closeModal}
            >
              <span className="">Cancel</span>
            </button>
            <button
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 focus:outline-none flex gap-2 w-fit items-center"
              onClick={handleDelete}
            >
              <span className="">Delete</span>
            </button>
          </div>
        </Modal>
        <ProductModal
          isOpen={isModalDetailOpen}
          closeModal={closeModal}
          id={idToShow}
        />
      </div>
    </>
  );
};

export default productList;
