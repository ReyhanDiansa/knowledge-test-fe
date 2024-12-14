import React from "react";
import RegisterComponent from "../../components/pages/register";

export const metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}register`),
  title: "Register",
  description:
    "Create a new account on KelolaProduk to start managing your products and categories effortlessly.",
  openGraph: {
    title: "Register | KelolaProduk",
    description:
      "Create a new account on KelolaProduk to start managing your products and categories effortlessly.",
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL + "register",
    siteName: "KelolaProduk",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL + "register",
  },
};

const Register = () => {
  return (
    <div className="bg-[#F5F7F8] w-screen h-screen">
      <div className="h-full">
        <RegisterComponent />
      </div>
    </div>
  );
};

export default Register;
