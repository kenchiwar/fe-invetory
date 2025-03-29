import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import brandService, { type Brand, type BrandDto } from "@/api/brand-service"

// Simplified state interface
interface BrandState {
  brandList: Brand[]
  selectedBrand: Brand | null
  loading: boolean
  error: string | null
}

// Initial state
const initialState: BrandState = {
  brandList: [],
  selectedBrand: null,
  loading: false,
  error: null,
}

// Async thunks
export const fetchBrands = createAsyncThunk("brands/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await brandService.getAllBrands()
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch brands")
  }
})

export const fetchBrandById = createAsyncThunk("brands/fetchById", async (id: number, { rejectWithValue }) => {
  try {
    return await brandService.getBrandById(id)
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch brand")
  }
})

export const saveBrand = createAsyncThunk("brands/save", async (brand: BrandDto, { rejectWithValue }) => {
  try {
    return await brandService.saveBrand(brand)
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to save brand")
  }
})

export const deleteBrand = createAsyncThunk("brands/delete", async (id: number, { rejectWithValue }) => {
  try {
    await brandService.deleteBrand(id)
    return id
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to delete brand")
  }
})

// Slice
const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setSelectedBrand: (state, action: PayloadAction<Brand | null>) => {
      state.selectedBrand = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch all brands
    builder.addCase(fetchBrands.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchBrands.fulfilled, (state, action: PayloadAction<Brand[]>) => {
      state.loading = false
      state.brandList = action.payload
    })
    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Fetch brand by ID
    builder.addCase(fetchBrandById.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchBrandById.fulfilled, (state, action: PayloadAction<Brand>) => {
      state.loading = false
      state.selectedBrand = action.payload
    })
    builder.addCase(fetchBrandById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Save brand (handles both create and update)
    builder.addCase(saveBrand.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(saveBrand.fulfilled, (state, action: PayloadAction<Brand>) => {
      state.loading = false

      // Check if this is an update or create
      const index = state.brandList.findIndex((brand) => brand.id === action.payload.id)

      if (index !== -1) {
        // Update existing brand
        state.brandList[index] = action.payload
      } else {
        // Add new brand
        state.brandList.push(action.payload)
      }

      state.selectedBrand = action.payload
    })
    builder.addCase(saveBrand.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Delete brand
    builder.addCase(deleteBrand.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(deleteBrand.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false
      state.brandList = state.brandList.filter((brand) => brand.id !== action.payload)
      if (state.selectedBrand && state.selectedBrand.id === action.payload) {
        state.selectedBrand = null
      }
    })
    builder.addCase(deleteBrand.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { setSelectedBrand, clearError } = brandSlice.actions
export default brandSlice.reducer

