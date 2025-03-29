// Common types for Redux
export type LoadingState = "All" | "Save" | "Delete" | "Get" | "None"

export interface ApiState<T> {
  brandList: T[]
  selectedBrand: T | null
  loading: LoadingState
  error: string | null
}

