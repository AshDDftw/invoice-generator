import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../types';

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const product = {
        ...action.payload,
        total: action.payload.quantity * action.payload.rate,
      };
      state.products.push(product);
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const { addProduct, clearProducts } = productSlice.actions;
export default productSlice.reducer;