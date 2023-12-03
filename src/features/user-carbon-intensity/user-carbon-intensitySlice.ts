import {
  UserCarbonIntensityResponse,
} from "../../types/carbonIntensityTypes";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { fetchUserCarbonIntensityData } from "./user-carbon-intensityThunks";

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

export const selectFirstModerateIntensitySlot = (
  state: RootState,
  date: Date
) => {
  return state.userCarbonIntensity.userData?.data.data?.find(slot => {
    const toDate = new Date(slot.to);
    return slot.intensity.index === "moderate" && toDate > date;
  });
};




const userCarbonIntensitySlice = createSlice({
  name: "carbonIntensity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCarbonIntensityData.pending, (state) => {
        state.isLoading = false;
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

export default userCarbonIntensitySlice.reducer;
