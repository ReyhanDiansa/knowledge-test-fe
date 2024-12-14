import React, { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const PasswordInput = ({
  name,
  label,
  id,
  placeholder,
  icon,
  value,
  onChange,
  withBottommargin = true,
  withIcon = true,
  withLabel = true,
  widthResponsive = "64",
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {withLabel && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}{" "}
          {required ? <span className="text-red-600">*</span> : "(Optional)"}
        </label>
      )}
      <div className={`relative ${withBottommargin && "mb-6"}`}>
        {withIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-${widthResponsive} md:w-80 ${
            withIcon && "px-10"
          } p-2.5`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
        >
          {showPassword ? <RxEyeOpen /> : <RxEyeClosed />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
