import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import carbonIntensitySlice from '../features/national-carbon-intensity/carbon-intensitySlice';
import userCarbonIntensitySlice from '../features/user-carbon-intensity/user-carbon-intensitySlice';

export const store = configureStore({
  reducer: {
    user: authSlice,
    carbonIntensity: carbonIntensitySlice,
    userCarbonIntensity: userCarbonIntensitySlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;