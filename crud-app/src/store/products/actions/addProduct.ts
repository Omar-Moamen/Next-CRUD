import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@/components/utils/axiosErrorHandler";
import { TToken } from "../../../types/shared";

type TProductWithToken = {
   token: TToken;
   title: string;
   price: number;
   quantity: number;
}

export const addProduct = createAsyncThunk('products/addProduct',
   async (productWithToken: TProductWithToken, thunkAPI) =>
   {
      const { token, title, price, quantity } = productWithToken;
      const { rejectWithValue } = thunkAPI;

      try
      {
         const response = await axios.post('http://localhost:8080',
            {
               title,
               price,
               quantity,
            },
            {
               headers: {
                  Authorization: token,
                  "Content-Type": 'application/json',
               }
            })
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   })