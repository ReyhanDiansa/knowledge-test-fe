import React from "react";
import SkeletonInput from "./inputSkeleton";

const productInfoLoading = () => {
  return (
    <div className="">
      <div className="flex md:flex-row flex-col gap-3">
        <div className="space-y-4 w-4/12 mb-1">
          <SkeletonInput width="full" height="full" />
        </div>
        <div className="w-7/12">
          <p className="space-y-4 w-full mb-1">
            <SkeletonInput width="full" height="7" />
          </p>
          <p className="space-y-4 w-full mb-1">
            {" "}
            <SkeletonInput width="full" height="10" />
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="space-y-4 w-full mb-1">
              <SkeletonInput width="full" height="4" />
            </div>
            <div className="space-y-4 w-full mb-1">
              <SkeletonInput width="full" height="4" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-4 w-full mb-1">
        <SkeletonInput width="full" height="4" />
        <div className="flex items-center gap-4">
          <div className="space-y-1 w-full">
            <SkeletonInput width="full" height="4" />
          </div>
          <div className="space-y-1 w-full">
            <SkeletonInput width="full" height="4" />
          </div>
        </div>
        <SkeletonInput width="full" height="4" />
      </div>
    </div>
  );
};

export default productInfoLoading;
