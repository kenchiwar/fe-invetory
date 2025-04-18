import axiosInstance from "./axios-instance";
import type { AxiosRequestConfig } from "axios";
import { CacheAxiosResponse, CacheProperties } from "axios-cache-interceptor";
export interface ApiResponse<T> {
  message: string;
  code: string;
  sent: Date;
  data: T;
}
export type myAxiosRequestConfig = AxiosRequestConfig & {
  cache?: boolean | Partial<CacheProperties<CacheAxiosResponse, unknown>>;
};
// Generic fetch function that handles all HTTP methods
export const fetch = async <T, D = any>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: D,
  config?: myAxiosRequestConfig
): Promise<T> => {
  try {
    let response;

    const myConfig = { cache: false, ...config } as myAxiosRequestConfig;

    switch (method) {
    case "GET":
      // add logic isactice memory cache

      if (myConfig.cache) {
        delete myConfig.cache;
      }
      // end logic unactive memory cache

      response = await axiosInstance.get<
          ApiResponse<T>,
          CacheAxiosResponse<ApiResponse<T>>
        >(url, myConfig);

      break;
    case "POST":
      response = await axiosInstance.post<
          ApiResponse<T>,
          CacheAxiosResponse<ApiResponse<T>>
        >(url, data, config);
      break;
    case "PUT":
      response = await axiosInstance.put<
          ApiResponse<T>,
          CacheAxiosResponse<ApiResponse<T>>
        >(url, data, config);
      break;
    case "DELETE":
      response = await axiosInstance.delete<
          ApiResponse<T>,
          CacheAxiosResponse<ApiResponse<T>>
        >(url, {
          ...config,
          data // For DELETE requests, data needs to be passed as config.data
        });
      break;
    case "PATCH":
      response = await axiosInstance.patch<
          ApiResponse<T>,
          CacheAxiosResponse<ApiResponse<T>>
        >(url, data, config);
      break;
    default:
      throw new Error(`Unsupported method: ${method}`);
    }

    return response.data.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error);
    throw error;
  }
};

export default {
  fetch
};
