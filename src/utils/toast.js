import { toast } from "react-toastify";

const showToast = (type, message, options = {}) => {
  const defaultOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const mergedOptions = { ...defaultOptions, ...options };

  switch (type) {
    case "success":
      toast.success(message, mergedOptions);
      break;
    case "error":
      toast.error(message, mergedOptions);
      break;
    case "info":
      toast.info(message, mergedOptions);
      break;
    case "warning":
      toast.warning(message, mergedOptions);
      break;
    default:
      toast(message, mergedOptions);
      break;
  }
};

export default showToast;
