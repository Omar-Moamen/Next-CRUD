import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@/components/utils/axiosErrorHandler";
import { TProduct } from "../../../types/product";
import { TToken } from "../../../types/shared";

type TProductWithToken = TProduct & {
   token: TToken
}

export const updateProduct = createAsyncThunk('products/edit',
   async (productWithToken: TProductWithToken, thunkAPI) =>
   {
      const { token, _id, title, price, quantity } = productWithToken;
      const { rejectWithValue } = thunkAPI;

      try
      {
         const response = await axios.put(`http://localhost:8080/${_id}`,
            {
               title,
               price,
               quantity
            },
            {
               headers: {
                  Authorization: token
               }
            }

         )
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   })