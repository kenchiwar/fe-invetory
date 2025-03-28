import axiosInstance from "./axios-instance"
import type { AxiosRequestConfig } from "axios"

export interface ApiResponse<T> {
  message: string
  code: string
  data: T
}
// Generic fetch function that handles all HTTP methods
export const fetch = async <T, D = any>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    let response

    switch (method) {
      case "GET":
        response = await axiosInstance.get<ApiResponse<T>>(url, config)
        break
      case "POST":
        response = await axiosInstance.post<ApiResponse<T>>(url, data, config)
        break
      case "PUT":
        response = await axiosInstance.put<ApiResponse<T>>(url, data, config)
        break
      case "DELETE":
        response = await axiosInstance.delete<ApiResponse<T>>(url, {
          ...config,
          data, // For DELETE requests, data needs to be passed as config.data
        })
        break
      case "PATCH":
        response = await axiosInstance.patch<ApiResponse<T>>(url, data, config)
        break
      default:
        throw new Error(`Unsupported method: ${method}`)
    }

    return response.data.data
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error)
    throw error
  }
}

export default {
  fetch,
}

