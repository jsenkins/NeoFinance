// client/src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { api }     from './api';

export default configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefault) =>
    getDefault().concat(api.middleware)
});
