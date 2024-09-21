import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@/components/utils/axiosErrorHandler";
import { TLoginData } from "@/types/shared";

type TResponse = {
   accessToken: string;
   message: string;
}

export const authLogin = createAsyncThunk("auth/authLogin",
   async (formData: TLoginData, thunkAPI) =>
   {
      const { rejectWithValue } = thunkAPI;
      try
      {
         const response = await axios.post<TResponse>('http://localhost:8080/login', formData);
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   }
);