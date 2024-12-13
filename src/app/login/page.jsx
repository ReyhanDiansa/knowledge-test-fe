"use client";

import React from "react";
import LoginComponent from "../../components/pages/login";
import { withAuth } from "../../utils/authenticationMiddleware";

const Login = () => {
  return (
    <div className="bg-light w-screen h-screen">
      <div className="h-full">
        <LoginComponent />
      </div>
    </div>
  );
};

export default withAuth(Login);
