"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "./cookie";

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = getCookie("knwtest-token");
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

      if (!token) {
        if (
          !currentPath.startsWith("/login") &&
          !currentPath.startsWith("/register")
        ) {
          router.push("/login");
        }
      } else {
        if (
          currentPath.startsWith("/login") ||
          currentPath.startsWith("/register")
        ) {
          router.push("/");
        }
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};
