import { CarbonIntensityResponse } from "../../types/carbonIntensityTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCarbonIntensityData,
} from "./carbon-intensityThunks";

interface CarbonIntensityState {
  nationalData: CarbonIntensityResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CarbonIntensityState = {
  nationalData: null,
  isLoading: false,
  error: null,
};



const carbonIntensitySlice = createSlice({
  name: "carbonIntensity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarbonIntensityData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarbonIntensityData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nationalData = action.payload;
      })
      .addCase(fetchCarbonIntensityData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default carbonIntensitySlice.reducer;
