import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiState } from "../types";
import currentStockService, { type CurrentStock, type CurrentStockDto } from "@/api/current-stock-service";
import { setLoading, clearLoading } from "./loadingReducer";

// Cập nhật interface
interface BrandApiState extends ApiState {
  brandList: CurrentStock[],
  selectedBrand: CurrentStock | null,
}
// Initial state
const initialState: BrandApiState = {
  brandList: [], // Using brandList as the list property name for consistency with ApiState
  selectedBrand: null, // Using selectedBrand as the selected item property name for consistency
  loading: "None",
  error: null
};


// Async thunks
export const fetchCurrentStocks = createAsyncThunk(
  "currentStocks/fetchAll",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading({ status: "All", entityType: "currentStock" }));
      const result = await currentStockService.getAllCurrentStocks();

      console.log(result, "result");
      dispatch(clearLoading());
      return result;
    } catch (error) {
      dispatch(clearLoading());
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch current stocks");
    }
  }
);

export const fetchCurrentStockById = createAsyncThunk(
  "currentStocks/fetchById",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading({ status: "Get", entityType: "currentStock" }));
      const result = await currentStockService.getCurrentStockById(id);

      console.log(result, "result");
      dispatch(clearLoading());
      return result;
    } catch (error) {
      dispatch(clearLoading());
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch current stock");
    }
  }
);

export const saveCurrentStock = createAsyncThunk(
  "currentStocks/save",
  async (currentStock: CurrentStock, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading({ status: "Save", entityType: "currentStock" }));
     
      currentStock.CreatedBy = "2025-03-30T09:03:29.883Z";
      currentStock.UpdatedBy =  "2025-03-30T09:03:29.883Z";

      console.log("current", currentStock);
      const result = await currentStockService.saveCurrentStock(currentStock);
      
      console.log(result, "result");
      dispatch(clearLoading());
      return result;
    } catch (error) {
      dispatch(clearLoading());
      return rejectWithValue(error instanceof Error ? error.message : "Failed to save current stock");
    }
  }
);

export const deleteCurrentStock = createAsyncThunk(
  "currentStocks/delete",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading({ status: "Delete", entityType: "currentStock" }));
      await currentStockService.deleteCurrentStock(id);
      dispatch(clearLoading());
      return id;
    } catch (error) {
      dispatch(clearLoading());
      return rejectWithValue(error instanceof Error ? error.message : "Failed to delete current stock");
    }
  }
);

// Slice
const currentStockSlice = createSlice({
  name: "currentStocks",
  initialState,
  reducers: {
    setSelectedCurrentStock: (state, action: PayloadAction<CurrentStock | null>) => {
      state.selectedBrand = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch all current stocks
    builder.addCase(fetchCurrentStocks.fulfilled, (state, action: PayloadAction<CurrentStock[]>) => {
      console.log(action, "action");
      state.brandList = action.payload;
    });
    builder.addCase(fetchCurrentStocks.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Fetch current stock by ID
    builder.addCase(fetchCurrentStockById.fulfilled, (state, action: PayloadAction<CurrentStock>) => {
      state.selectedBrand = action.payload;
    });
    builder.addCase(fetchCurrentStockById.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Save current stock
    builder.addCase(saveCurrentStock.fulfilled, (state, action: PayloadAction<CurrentStock>) => {
      // Update the selected current stock
      state.selectedBrand = action.payload;

      // Update the list if the current stock already exists
      const index = state.brandList.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.brandList[index] = action.payload;
      } else {
        // Add to the list if it's new
        state.brandList.push(action.payload);
      }
    });
    builder.addCase(saveCurrentStock.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Delete current stock
    builder.addCase(deleteCurrentStock.fulfilled, (state, action: PayloadAction<number>) => {
      // Remove from the list
      state.brandList = state.brandList.filter((item) => item.id !== action.payload);

      // Clear selected current stock if it was deleted
      if (state.selectedBrand && state.selectedBrand.id === action.payload) {
        state.selectedBrand = null;
      }
    });
    builder.addCase(deleteCurrentStock.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  }
});

export const { setSelectedCurrentStock, clearError } = currentStockSlice.actions;
export default currentStockSlice.reducer;

