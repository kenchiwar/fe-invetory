// import type { Entity } from "@/api/base-service";
// import {
//   createSlice,
//   createAsyncThunk,
//   type PayloadAction
// } from "@reduxjs/toolkit";
// import type { ApiState } from "../types";
// import brandService, { type Brand, type BrandDto } from "@/api/brand-service";
// import { setLoading, clearLoading } from "./loadingReducer";
// export interface ApiState {
//   error: null;
// }

// export abstract class BaseApiSplice<T extends Entity, Dto = Omit<T, "id">> {
//   protected abstract entityType: string;
//   protected abstract service: {
//     getAll(): () => Promise<T[]>;
//     getById(): (id: number) => Promise<T>;
//   };
//   getAll = () => {
//     return createAsyncThunk(
//       `${this.entityType}/fetchAll`,
//       async (_, { dispatch, rejectWithValue }) => {
//         try {
//           dispatch(
//             setLoading({ status: "All", entityType: `${this.entityType}` })
//           );
//           const result = await this.service.getAll();

//           dispatch(clearLoading());
//           return result;
//         } catch (error) {
//           dispatch(clearLoading());
//           return rejectWithValue(
//             error instanceof Error ? error.message : "Failed to fetch brands"
//           );
//         }
//       }
//     );
//   };
// }
