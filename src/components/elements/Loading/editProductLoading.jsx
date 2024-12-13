import React from "react";
import SkeletonInput from "./inputSkeleton";

const editProductLoading = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="space-y-4 w-4/12 mb-3">
        <SkeletonInput width="3/4" height="4" />
        <SkeletonInput width="full" height="12" />
      </div>
      <div className="space-y-4 w-4/12 mb-3">
        <SkeletonInput width="3/4" height="4" />
        <SkeletonInput width="full" height="14" />
      </div>
      <div className="space-y-4 w-4/12 mb-3">
        <SkeletonInput width="3/4" height="4" />
        <SkeletonInput width="full" height="12" />
      </div>
      <div className="space-y-4 w-4/12 mb-3">
        <SkeletonInput width="3/4" height="4" />
        <SkeletonInput width="full" height="12" />
      </div>
      <div className="space-y-4 w-4/12 mb-3">
        <SkeletonInput width="3/4" height="4" />
        <SkeletonInput width="full" height="12" />
      </div>
      <div className="space-y-4 w-4/12 mb-3">
        <SkeletonInput width="3/4" height="4" />
        <SkeletonInput width="full" height="12" />
      </div>
    </div>
  );
};

export default editProductLoading;
