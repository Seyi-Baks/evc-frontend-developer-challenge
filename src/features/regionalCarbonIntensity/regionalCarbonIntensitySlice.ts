import {
  RegionalCarbonIntensityResponse,
} from "../../types/carbonIntensityTypes";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserCarbonIntensityData } from "./regionalCarbonIntensityThunks";

interface UserCarbonIntensityState {
  data: RegionalCarbonIntensityResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserCarbonIntensityState = {
  data: null,
  isLoading: false,
  error: null,
};

const regionalCarbonIntensitySlice = createSlice({
  name: "regionalCarbonIntensity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCarbonIntensityData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserCarbonIntensityData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserCarbonIntensityData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default regionalCarbonIntensitySlice.reducer;
