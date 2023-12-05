import {
  UserCarbonIntensityResponse,
} from "../../types/carbonIntensityTypes";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserCarbonIntensityData } from "./regionalCarbonIntensityThunks";

interface UserCarbonIntensityState {
  userData: UserCarbonIntensityResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserCarbonIntensityState = {
  userData: null,
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
        state.userData = action.payload;
      })
      .addCase(fetchUserCarbonIntensityData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default regionalCarbonIntensitySlice.reducer;
