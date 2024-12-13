import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, title,height, children, withClose = true }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 py-8 text-black">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className={`bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-2xl mx-auto h-[${height}px]`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-3xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="mb-4">{children}</div>
        {withClose && (
          <div className="text-right">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;