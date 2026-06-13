import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
