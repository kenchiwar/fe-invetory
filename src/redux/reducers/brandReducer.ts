import {
  createSlice,
  createAsyncThunk,
  type PayloadAction
} from "@reduxjs/toolkit";
import type { ApiState } from "../types";
import brandService, { type Brand, type BrandDto } from "@/api/brand-service";
import { setLoading, clearLoading } from "./loadingReducer";

// Cập nhật interface
interface BrandApiState<T> extends ApiState {
  brandList: T[];
  selectedBrand: T | null;
}
// Initial state
const initialState: BrandApiState<Brand> = {
  brandList: [],
  selectedBrand: null,
  loading: "None",
  error: null
};

// Async thunks
export const fetchBrands = createAsyncThunk(
  "brands/fetchAll",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading({ status: "All", entityType: "brand" }));
      const result = await brandService.getAllBrands();

      dispatch(clearLoading());
      return result;
    } catch (error) {
      dispatch(clearLoading());
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch brands"
      );
    }
  }
);

export const fetchBrandById = createAsyncThunk(
  "brands/fetchById",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading({ status: "Get", entityType: "brand" }));
      const result = await brandService.getBrandById(id);

      dispatch(clearLoading());
      return result;
    } catch (error) {
      dispatch(clearLoading());
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch brand"
      );
    }
  }
);

export const saveBrand = createAsyncThunk(
  "brands/save",
  async (brand: BrandDto, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading({ status: "Save", entityType: "brand" }));
      const result = await brandService.saveBrand(brand);
      // After saving, refresh the list

      await brandService.getAllBrands();
      dispatch(clearLoading());
      return result;
    } catch (error) {
      dispatch(clearLoading());
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to save brand"
      );
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brands/delete",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading({ status: "Delete", entityType: "brand" }));
      await brandService.deleteBrand(id);
      // After deleting, refresh the list
      await brandService.getAllBrands();
      dispatch(clearLoading());
      return id;
    } catch (error) {
      dispatch(clearLoading());
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete brand"
      );
    }
  }
);

// Slice
const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setSelectedBrand: (state, action: PayloadAction<Brand | null>) => {
      state.selectedBrand = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch all brands
    builder.addCase(
      fetchBrands.fulfilled,
      (state, action: PayloadAction<Brand[]>) => {
        state.brandList = action.payload;
      }
    );
    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Fetch brand by ID
    builder.addCase(
      fetchBrandById.fulfilled,
      (state, action: PayloadAction<Brand>) => {
        state.selectedBrand = action.payload;
      }
    );
    builder.addCase(fetchBrandById.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Save brand
    builder.addCase(
      saveBrand.fulfilled,
      (state, action: PayloadAction<Brand>) => {
        // Update the selected brand
        state.selectedBrand = action.payload;

        // Update the list if the brand already exists
        const index = state.brandList.findIndex(
          (brand) => brand.id === action.payload.id
        );

        if (index !== -1) {
          state.brandList[index] = action.payload;
        } else {
          // Add to the list if it's new
          state.brandList.push(action.payload);
        }
      }
    );
    builder.addCase(saveBrand.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Delete brand
    builder.addCase(
      deleteBrand.fulfilled,
      (state, action: PayloadAction<number>) => {
        // Remove from the list
        state.brandList = state.brandList.filter(
          (brand) => brand.id !== action.payload
        );

        // Clear selected brand if it was deleted
        if (state.selectedBrand && state.selectedBrand.id === action.payload) {
          state.selectedBrand = null;
        }
      }
    );
    builder.addCase(deleteBrand.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  }
});

export const { setSelectedBrand, clearError } = brandSlice.actions;
export default brandSlice.reducer;
