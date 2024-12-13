import React from "react";
import LoginComponent from "../../components/pages/login";

export const metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}login`),
  title: "Login",
  description:
    "Login to KelolaProduk to access your account and manage products and categories with ease.",
  openGraph: {
    title: "Login | KelolaProduk",
    description:
      "Login to KelolaProduk to access your account and manage products and categories with ease",
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL + "login",
    siteName: "KelolaProduk",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL + "login",
  },
};

const Login = () => {
  return (
    <div className="bg-light w-screen h-screen">
      <div className="h-full">
        <LoginComponent />
      </div>
    </div>
  );
};

export default Login;
