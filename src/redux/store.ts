import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import nationalCarbonIntensitySlice from '../features/nationalCarbonIntensity/nationalCarbonIntensitySlice';
import regionalCarbonIntensitySlice from '../features/regionalCarbonIntensity/regionalCarbonIntensitySlice';

export const store = configureStore({
  reducer: {
    user: authSlice,
    nationalCarbonIntensity: nationalCarbonIntensitySlice,
    regionalCarbonIntensity: regionalCarbonIntensitySlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;