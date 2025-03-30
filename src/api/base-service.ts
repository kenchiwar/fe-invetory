import { fetch, type myAxiosRequestConfig } from "./api-service"

// Generic interface for entity with ID
export interface Entity {
  id: number
  [key: string]: any
}

// Base service class that can be extended by specific entity services
export class BaseService<T extends Entity, Dto = Omit<T, "id">> {
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  // Get all entities
  async getAll(config?: myAxiosRequestConfig): Promise<T[]> {
    return fetch<T[]>("GET", this.endpoint, undefined, config)
  }

  // Get entity by ID
  async getById(id: number, config?: myAxiosRequestConfig): Promise<T> {
    return fetch<T>("GET", `${this.endpoint}/${id}`, undefined, config)
  }

  // Save entity (create or update based on whether id is provided)
  async save(data: Dto & Partial<{ id: number }>, config?: myAxiosRequestConfig): Promise<T> {
    // Always use POST for both create and update
    return fetch<T, Dto & Partial<{ id: number }>>("POST",`${this.endpoint}/save`, data, config)
  }

  // Delete entity
  async delete(id: number, config?: myAxiosRequestConfig): Promise<void> {
    return fetch<void, null>("DELETE", `${this.endpoint}?id=${id}`, null, config)
  }
}

