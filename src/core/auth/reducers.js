import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isUserAlreadyExist: null,
};

const authSlice = createSlice(
  {
    name: 'auth',
    initialState,
    reducers: {
      loginSuccess: (state, { payload: { accessToken, refreshToken, isUserAlreadyExist } }) => ({
        accessToken,
        refreshToken,
        isUserAlreadyExist,
      }),
      logout: () => initialState,
    },
  },
  {
    key: '@persist/auth',
  }
);

export const authActions = authSlice.actions;

export default authSlice.reducer;
