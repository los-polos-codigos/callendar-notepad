import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
  content: '',
  // content: 'Wystąpił nieoczekiwany błąd',
};

const errorsSlice = createSlice(
  {
    name: 'error',
    initialState,
    reducers: {
      show: (state, { payload: { content } }) => ({
        isActive: true,
        content,
      }),
      hide: () => initialState,
    },
  },
  {
    key: '@persist/error',
  }
);

export const errorsActions = errorsSlice.actions;

export default errorsSlice.reducer;
