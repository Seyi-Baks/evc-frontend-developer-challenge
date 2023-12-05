import { getRegionalCarbonIntensityData } from '../../services';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserCarbonIntensityData = createAsyncThunk(
    'carbonIntensity/fetchUserData',
    async ({ date, postCode }: { date: string; postCode: string }, { rejectWithValue }) => {
      try {
        return await getRegionalCarbonIntensityData(date, postCode);
      } catch (e) {
        const error = e as Error;
        return rejectWithValue(error.message);
      }
    }
  );