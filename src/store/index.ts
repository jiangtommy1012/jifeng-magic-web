import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import trendsReducer from './trendsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    trends: trendsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
