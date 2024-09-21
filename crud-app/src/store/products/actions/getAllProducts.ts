import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosErrorHandler from '@/components/utils/axiosErrorHandler';
import { TProduct } from '../../../types/product';

type TResponse = {
   product: TProduct[]
};

export const getAllProducts = createAsyncThunk('products/getAllProducts',
   async (token: string, thunkAPI) =>
   {
      const { rejectWithValue } = thunkAPI;
      try
      {
         const response = await axios.get<TResponse>('http://localhost:8080', {
            headers: {
               Authorization: token!
            }
         });
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   })