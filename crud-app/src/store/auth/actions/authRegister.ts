import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@/components/utils/axiosErrorHandler";
import { TRegisterData } from "../../../types/shared";

export const authRegister = createAsyncThunk('auth/authRegister',
   async (formData: TRegisterData, thunkAPI) =>
   {
      const { rejectWithValue } = thunkAPI;
      try
      {
         const response = await axios.post('http://localhost:8080/register', formData);
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error))
      }
   })