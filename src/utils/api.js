import axios from "axios";
import { getCookie } from "./cookie";
import { useRouter } from "next/router";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    try {
      // Get token from cookies
      const token = getCookie("knwtest-token");

      // If token exists, add it to Authorization header
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error parsing token:", error);
    }

    return config;
  },
  (error) => {
    // Log request errors
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    // Log response errors for debugging
    console.error("Response Error:", error?.response || error.message || error);

    return Promise.reject(error);
  }
);

export default api;
