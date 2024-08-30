import { createSlice } from "@reduxjs/toolkit";
import { actGetAllProducts } from "./act/actGetAllProducts";
import { actAddProduct } from "./act/actAddProduct";
import { actDeleteProduct } from "./act/actDeleteProduct";
import { actGetSingleProduct } from "./act/actGetSingleProduct";
import { actUpdateProduct } from "./act/actUpdateProduct";
import { TProduct } from "@/types/product";
import { TError, TLoading } from "../../types/shared";
import { isString } from "@/types/guards";

type TProductsState = {
   records: TProduct[],
   productInfo: TProduct | null,
   loading: TLoading,
   error: TError,
}

const initialState: TProductsState = {
   records: [],
   productInfo: null,
   loading: 'idle',
   error: null,
}

const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      cleanProductInfo: (state) =>
      {
         state.loading = 'idle';
         state.productInfo = null;
      }
   },
   extraReducers: (builder) =>
   {
      // Get All Products
      builder
         .addCase(actGetAllProducts.pending, (state) =>
         {
            state.loading = 'pending';
            state.error = null;
         })
         .addCase(actGetAllProducts.fulfilled, (state, { payload }) =>
         {
            state.loading = 'succeeded';
            state.error = null;
            state.records = payload.product;
         })
         .addCase(actGetAllProducts.rejected, (state, { payload }) =>
         {
            state.loading = 'failed';
            if (isString(payload))
               state.error = payload;
         })

         // Get Single Product
         .addCase(actGetSingleProduct.pending, (state) =>
         {
            state.loading = 'pending';
            state.error = null;
         })
         .addCase(actGetSingleProduct.fulfilled, (state, { payload }) =>
         {
            state.loading = 'succeeded';
            state.error = null;
            state.productInfo = payload.message;
         })
         .addCase(actGetSingleProduct.rejected, (state, { payload }) =>
         {
            state.loading = 'failed';
            if (isString(payload))
               state.error = payload;
         })

         // Add Product
         .addCase(actAddProduct.pending, (state) =>
         {
            state.loading = 'pending';
            state.error = null;
         })
         .addCase(actAddProduct.fulfilled, (state, { payload }) =>
         {
            state.loading = 'succeeded';
            state.error = null;
            state.records.push(payload.product);
         })
         .addCase(actAddProduct.rejected, (state, { payload }) =>
         {
            state.loading = 'failed';
            if (isString(payload))
               state.error = payload;
         })

         // Edit Product
         .addCase(actUpdateProduct.pending, (state) =>
         {
            state.loading = 'pending';
            state.error = null;
         })
         .addCase(actUpdateProduct.fulfilled, (state) =>
         {
            state.loading = 'succeeded';
            state.error = null;
         })
         .addCase(actUpdateProduct.rejected, (state, { payload }) =>
         {
            state.loading = 'failed';
            if (isString(payload))
               state.error = payload;
         })

         // Delete Product
         .addCase(actDeleteProduct.pending, (state) =>
         {
            state.loading = 'pending';
            state.error = null;
         })
         .addCase(actDeleteProduct.fulfilled, (state, { payload }) =>
         {
            state.loading = 'succeeded';
            state.error = null;
            state.records = state.records.filter(el => (el["_id"] !== payload));
         })
         .addCase(actDeleteProduct.rejected, (state, { payload }) =>
         {
            state.loading = 'failed';
            if (isString(payload))
               state.error = payload;
         })
   }
})

export const { cleanProductInfo } = productsSlice.actions;
export default productsSlice.reducer;