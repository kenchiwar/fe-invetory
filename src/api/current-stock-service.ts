import { BaseService } from "./base-service"

export interface CurrentStock {
  id: number
  productID: number
  productVariantID: number | null
  uoMID: number
  quantity: number;
  warehouseID: number;
  storageBinID: number | null;
  rowPointer: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  CreatedBy : string;
  UpdatedBy: string;
}

export interface CurrentStockDto {
  id?: number;
  productID: number;
  productVariantID: number | null;
  uoMID: number;
  quantity: number;
  warehouseID: number
  storageBinID: number | null;
}

class CurrentStockService extends BaseService<CurrentStock> {
  constructor() {
    super("/CurrentStock")
  }

  // Get all current stock items
  async getAllCurrentStocks(config?: { cache?: boolean }): Promise<CurrentStock[]> {
    return this.getAll(config)
  }

  // Get all current stock items with cache option
  async getAllCurrentStocksCached(): Promise<CurrentStock[]> {
    return this.getAll({ cache: true })
  }

  // Get current stock by ID
  async getCurrentStockById(id: number): Promise<CurrentStock> {
    return this.getById(id)
  }

  // Save current stock (create or update)
  async saveCurrentStock(data: CurrentStock): Promise<CurrentStock> {
    return this.save(data)
  }

  // Delete current stock
  async deleteCurrentStock(id: number): Promise<void> {
    return this.delete(id)
  }

  // Clear current stock cache
  clearCurrentStockCache(): void {
    console.log("Cache cleared for current stock")
  }
}

// Create and export a singleton instance
const currentStockService = new CurrentStockService()
export default currentStockService

