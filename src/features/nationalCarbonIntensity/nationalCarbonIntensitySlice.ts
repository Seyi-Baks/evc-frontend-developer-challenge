import { CarbonIntensityResponse } from "../../types/carbonIntensityTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCarbonIntensityData,
} from "./nationalCarbonIntensityThunks";

interface CarbonIntensityState {
  data: CarbonIntensityResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CarbonIntensityState = {
  data: null,
  isLoading: false,
  error: null,
};



const nationalCarbonIntensitySlice = createSlice({
  name: "nationalCarbonIntensity",
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
        state.data = action.payload;
      })
      .addCase(fetchCarbonIntensityData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default nationalCarbonIntensitySlice.reducer;
