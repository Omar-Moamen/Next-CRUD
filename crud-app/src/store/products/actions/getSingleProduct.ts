import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@/components/utils/axiosErrorHandler";
import { TProductIdWithToken } from "../../../types/shared";



export const getSingleProduct = createAsyncThunk("products/getSingleProduct",
   async (productIdWithToken: TProductIdWithToken, thunkAPI) =>
   {
      const { _id, token } = productIdWithToken;
      const { rejectWithValue } = thunkAPI;
      try
      {
         const response = await axios.get(`http://localhost:8080/${_id}`, {
            headers: {
               Authorization: token,
            },
         });
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   })