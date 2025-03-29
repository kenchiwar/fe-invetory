import { fetch, myAxiosRequestConfig } from "./api-service"

export interface Brand {
  brandCode: string
  brandName: string
  id: number
  rowPointer: string
  createdBy: string
  createdDate: string
  updatedBy: string
  updatedDate: string
}

export interface CreateBrandDto {
  brandCode: string
  brandName: string
}

export interface UpdateBrandDto {
  brandCode?: string
  brandName?: string
}

const brandService = {
  getAllBrands: async (): Promise<Brand[]> => {
    console.log("det");
    
    let a = {cache : true} as myAxiosRequestConfig;
    return fetch<Brand[]>("GET", "/Brand",{},a)
  },

  getBrandById: async (id: number): Promise<Brand> => {
    return fetch<Brand>("GET", `/Brand/${id}`)
  },

  createBrand: async (brand: CreateBrandDto): Promise<Brand> => {
    return fetch<Brand, CreateBrandDto>("POST", "/Brand", brand)
  },

  updateBrand: async (id: number, brand: UpdateBrandDto): Promise<Brand> => {
    return fetch<Brand, UpdateBrandDto>("PUT", `/Brand/${id}`, brand)
  },

  deleteBrand: async (id: number): Promise<void> => {
    return fetch<void, null>("DELETE", `/Brand/${id}`, null)
  },
}

export default brandService

