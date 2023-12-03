import { getUserCarbonIntensityData } from '../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserCarbonIntensityData = createAsyncThunk(
    'carbonIntensity/fetchUserData',
    async ({ date, postCode }: { date: string; postCode: string }, { rejectWithValue }) => {
      try {
        return await getUserCarbonIntensityData(date, postCode);
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );