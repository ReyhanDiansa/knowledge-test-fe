"use client";

import React from "react";
import RegisterComponent from "../../components/pages/register";
import { withAuth } from "../../utils/authenticationMiddleware";

const Register = () => {
  return (
    <div className="bg-[#F5F7F8] w-screen h-screen">
      <div className="h-full">
        <RegisterComponent />
      </div>
    </div>
  );
};

export default withAuth(Register);
