import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import { createSlice, configureStore } from '@reduxjs/toolkit';
import authReducer from 'core/auth/reducers';
import errorsReducer from 'core/errors/reducers';

// TODO: wywalić to
const counterSlice = createSlice(
  {
    name: 'counter',
    initialState: {
      value: 0,
    },
    reducers: {
      incremented: (state) => ({
        value: state.value + 1,
      }),
    },
  },
  {
    key: '@persist/count',
  }
);

export const countActions = counterSlice.actions;

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['errors'],
};

const rootReducer = combineReducers({
  count: counterSlice.reducer,
  auth: authReducer,
  errors: errorsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(saga),
});

export const persist = persistStore(store);
