import React from "react";

const textArea = ({
  name,
  icon,
  label,
  id,
  placeholder,
  value,
  onChange,
  withIcon = true,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="relative ">
        {withIcon && (
          <div className="absolute inset-y-0 start-0 flex items-start pt-4 ps-3.5 pointer-events-none">
            {icon}
          </div>
        )}
        <textarea
          id={id}
          name={name}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${withIcon && "ps-10"} p-2.5`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows="2"
        ></textarea>
      </div>
    </div>
  );
};

export default textArea;
