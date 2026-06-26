import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Trend, MarketRegion } from '../types';
import { getTrending } from '../services/magicApi';

interface TrendsState {
  items: Trend[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TrendsState = { items: [], status: 'idle', error: null };

export const fetchTrending = createAsyncThunk(
  'trends/fetch',
  (region?: MarketRegion | 'all') => getTrending(region)
);

const trendsSlice = createSlice({
  name: 'trends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(fetchTrending.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; })
      .addCase(fetchTrending.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message ?? 'Failed'; });
  },
});

export default trendsSlice.reducer;
