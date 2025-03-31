import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse
} from "axios";
import {
  setupCache,
  buildWebStorage,
  CacheInstance
} from "axios-cache-interceptor";

// Create axios instance with default config
const axiosInstance: AxiosInstance & CacheInstance = setupCache(
  axios.create({
    baseURL: "/api",
    timeout: 300000, // 30 seconds
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }),
  {
    storage: buildWebStorage(sessionStorage, "my-cache:"), // Sử dụng SessionStorage
    ttl: 1000 * 60 * 120, // Mặc định không cache
    methods: ["get"], // Chỉ cache GET requests
    interpretHeader: true //  tự động đọc headers cache từ server
  }
);

// Request interceptor to add user and client info to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Only modify the body for POST, PUT, PATCH requests
    if (
      config.method?.toLowerCase() === "post" ||
      config.method?.toLowerCase() === "put" ||
      config.method?.toLowerCase() === "patch"
    ) {
      // Get the original data
      // const originalData = config.data;

      // Create the new structure
      // config.data = {
      //   user: "currentUser", // Replace with actual user info
      //   client: "webClient", // Replace with actual client info
      //   data: originalData, // The original data
      // }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      console.error(`Error with status code: ${status}`);
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
