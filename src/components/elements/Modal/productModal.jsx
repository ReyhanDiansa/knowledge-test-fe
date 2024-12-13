import React, { useEffect, useState } from "react";
import Modal from "./modal";
import showToast from "../../../utils/toast";
import Image from "next/image";
import api from "../../../utils/api";
import { IoIosPricetags } from "react-icons/io";
import { formatRupiah } from "../../../utils/formatter";
import { AiOutlineStock } from "react-icons/ai";
import ProductInfoLoading from "../Loading/productInfoLoading";

const productModal = ({ isOpen, closeModal, id }) => {
  const [getLoading, setGetLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [productImage, setProductImage] = useState(product?.image);

  const findData = async () => {
    try {
      setGetLoading(true);
      const response = await api.get(`/product/find/${id}`);
      if (response?.data?.success) {
        setGetLoading(false);
        setProduct(response?.data?.data);
        setProductImage(response?.data?.data?.image);
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
    if (id) {
      findData();
    }
  }, [id]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Product Information"
        withClose={false}
      >
        {getLoading ? (
          <ProductInfoLoading />
        ) : (
          <div>
            <div className="flex md:flex-row flex-col gap-3">
              <div>
                <Image
                  src={productImage || "/asset/images/image-not-found.png"}
                  width={150}
                  height={150}
                  alt={product?.name || "Product image"}
                  onError={() =>
                    setProductImage("/asset/images/image-not-found.png")
                  }
                />
              </div>
              <div>
                <p className="bg-primary w-fit text-xs py-1 px-2 rounded-md font-semibold text-white">
                  {product?.category_id?.name}
                </p>
                <p className="mt-2 text-xl font-semibold">{product?.name}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <IoIosPricetags />
                    <p className="text-sm text-gray-500">
                      {formatRupiah(product?.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <AiOutlineStock />
                    <p className="text-sm text-gray-500">
                      {product?.stock} items in stock
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="flex items-center gap-2">{product?.description}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default productModal;
