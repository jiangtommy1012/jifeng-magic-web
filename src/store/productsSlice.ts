import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, Review, ProductFilters } from '../types';
import { getProducts, getProductById, getReviews } from '../services/magicApi';

interface ProductsState {
  items: Product[];
  selected: Product | null;
  reviews: Review[];
  filters: ProductFilters;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialFilters: ProductFilters = {
  region: 'all',
  source: 'all',
  category: 'all',
  search: '',
};

const initialState: ProductsState = {
  items: [],
  selected: null,
  reviews: [],
  filters: initialFilters,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchAll', (filters: Partial<ProductFilters>) =>
  getProducts(filters)
);

export const fetchProductById = createAsyncThunk('products/fetchOne', async (id: string) => {
  const [product, reviews] = await Promise.all([getProductById(id), getReviews(id)]);
  return { product, reviews };
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<ProductFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelected(state) {
      state.selected = null;
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message ?? 'Failed'; })
      .addCase(fetchProductById.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selected = action.payload.product ?? null;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchProductById.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message ?? 'Failed'; });
  },
});

export const { setFilters, clearSelected } = productsSlice.actions;
export default productsSlice.reducer;
