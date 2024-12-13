"use client";

import Layout from "../../components/layout/layout";
import ProfileComponent from "../../components/pages/profile"

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}profile`),
  title: "Profile",
  description: "User Profile",
  openGraph:{
    title: "Profile | KelolaProduk",
    description: "User Profile",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'profile',
    siteName:"KelolaProduk"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'profile'
  }
};

export default function Profile() {
  return (
    <Layout>
      <div>
        <ProfileComponent />
      </div>
    </Layout>
  );
}
