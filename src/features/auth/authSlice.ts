import { createSlice } from '@reduxjs/toolkit';
import { googleSignIn, logOut } from './authThunks';
import { ErrorState } from '../../types/errorTypes';

interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: ErrorState | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; 
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.error.message,
          code: action.error.code
        };
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null; 
      })
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;