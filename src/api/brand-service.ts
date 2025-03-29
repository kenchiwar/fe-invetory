import { BaseService } from "./base-service"

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

export interface BrandDto {
  brandCode: string
  brandName: string
  id?: number
}

class BrandService extends BaseService<Brand, BrandDto> {
  constructor() {
    super("/Brand")
  }

  // Get all brands
  async getAllBrands(config?: { cache?: boolean }): Promise<Brand[]> {
    return this.getAll(config)
  }

  // Get all brands with cache option
  async getAllBrandsCached(): Promise<Brand[]> {
    return this.getAll({ cache: true })
  }

  // Get brand by ID
  async getBrandById(id: number): Promise<Brand> {
    return this.getById(id)
  }

  // Save brand (create or update)
  async saveBrand(data: BrandDto): Promise<Brand> {
    return this.save(data)
  }

  // Delete brand
  async deleteBrand(id: number): Promise<void> {
    return this.delete(id)
  }

  // Clear brand cache (if needed)
  clearBrandCache(): void {
    // This would need to be implemented based on your caching strategy
    console.log("Cache cleared for brands")
  }
}

// Create and export a singleton instance
const brandService = new BrandService()
export default brandService

