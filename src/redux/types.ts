// Common types for Redux
export type LoadingState = "All" | "Save" | "Delete" | "Get" | "None"

export interface ApiState {
 
  loading: LoadingState
  error: string | null,
}

