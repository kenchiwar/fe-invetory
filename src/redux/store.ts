import { configureStore } from "@reduxjs/toolkit"
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import testReducer from "./reducers/test"
import loadingReducer from "./reducers/loadingReducer"
import brandReducer from "./reducers/brandReducer"
import currentStockReducer from "./reducers/currentStockReducer"
export const store = configureStore({
  reducer: {
    test: testReducer,
    loading: loadingReducer,
    brands: brandReducer,
       currentStocks: currentStockReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()


