import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@/components/utils/axiosErrorHandler";
import { TProductIdWithToken } from "../../../types/shared";



export const actGetSingleProduct = createAsyncThunk("products/actGetSingleProduct",
   async (productIdWithToken: TProductIdWithToken, thunkAPI) =>
   {
      const { _id, token } = productIdWithToken;
      const { rejectWithValue, signal } = thunkAPI;
      try
      {
         const response = await axios.get(`http://localhost:8080/${_id}`, {
            headers: {
               Authorization: token,
            },
            signal,
         });
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   })