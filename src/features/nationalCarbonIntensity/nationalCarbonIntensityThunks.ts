import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCarbonIntensityData } from '../../services';

export const fetchCarbonIntensityData = createAsyncThunk(
  'carbonIntensity/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      return await getCarbonIntensityData();;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
