import React from "react";

const Input = ({
  name,
  label,
  type,
  id,
  placeholder,
  icon,
  value,
  onChange,
  withLabel = true,
  withIcon = true,
  width = "80",
  required = true,
}) => {
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
      <div className="relative">
        {withIcon && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-${width} ${
            withIcon && "ps-10"
          } p-2.5`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
