import React from "react";
import SkeletonInput from "./inputSkeleton";

const ProfileLoading = () => {
  return (
    <>
      <div className="space-y-4 w-8/12 md:w-2/12 mb-1 h-[13rem]">
        <SkeletonInput width="full" height="full" />
      </div>
      <div className="flex flex-wrap md:w-7/12 flex-col md:flex-row gap-3 h- ">
        <div className="space-y-4 md:w-5/12 mb-3">
          <SkeletonInput width="3/4" height="4" />
          <SkeletonInput width="full" height="12" />
        </div>
        <div className="space-y-4 md:w-5/12 mb-3">
          <SkeletonInput width="3/4" height="4" />
          <SkeletonInput width="full" height="12" />
        </div>
        <div className="space-y-4 md:w-5/12 mb-3">
          <SkeletonInput width="3/4" height="4" />
          <SkeletonInput width="full" height="12" />
        </div>
      </div>
    </>
  );
};

export default ProfileLoading;
