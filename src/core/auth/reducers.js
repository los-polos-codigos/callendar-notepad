import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isUserAlreadyExist: null,
  deviceId: null,
};

const authSlice = createSlice(
  {
    name: 'auth',
    initialState,
    reducers: {
      loginSuccess: (state, { payload: { accessToken, refreshToken, isUserAlreadyExist } }) => ({
        ...state,
        accessToken,
        refreshToken,
        isUserAlreadyExist,
      }),
      logout: (state) => ({
        ...initialState,
        deviceId: state.deviceId,
      }),
      setDeviceId: (state, { payload: { deviceId } }) => ({
        ...state,
        deviceId,
      }),
      setNewTokens: (state, { payload }) => ({
        ...state,
        ...payload,
      }),
    },
  },
  {
    key: 'persist/auth',
  }
);

export const authActions = authSlice.actions;

export default authSlice.reducer;
