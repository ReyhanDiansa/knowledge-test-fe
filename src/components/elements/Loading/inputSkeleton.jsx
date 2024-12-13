import React from "react";

const SkeletonInput = ({
  width = "full",
  height = "10",
  rounded = "md",
  additionalClasses = "",
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 w-${width} h-${height} rounded-${rounded}
        ${additionalClasses}`}
    />
  );
};

export default SkeletonInput;
