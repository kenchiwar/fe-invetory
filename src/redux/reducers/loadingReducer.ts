import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { LoadingState } from "../types"

interface LoadingSliceState {
  status: LoadingState
  entityType: string | null
}

const initialState: LoadingSliceState = {
  status: "None",
  entityType: null,
}

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ status: LoadingState; entityType: string }>) => {
      state.status = action.payload.status
      state.entityType = action.payload.entityType
    },
    clearLoading: (state) => {
      state.status = "None"
      state.entityType = null
    },
  },
})

export const { setLoading, clearLoading } = loadingSlice.actions
export default loadingSlice.reducer

