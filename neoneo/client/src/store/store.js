import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';

export default configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: getDefault => getDefault().concat(api.middleware)
});
