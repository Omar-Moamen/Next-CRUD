import { createSlice } from "@reduxjs/toolkit";
import { authRegister } from "./actions/authRegister";
import { authLogin } from "./actions/authLogin";
import { isString } from "@/types/guards";
import { jwtDecode } from "jwt-decode";
import { TUser } from "@/types/user";
import { TLoading } from "@/types/shared";

type TAuthState = {
   token: string | null;
   user: TUser;
   loading: TLoading;
   error: string | null;
}

const initialState: TAuthState = {
   token: null,
   user: null,
   loading: false,
   error: null,
}

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      clearAuthUI: (state) =>
      {
         state.loading = false;
         state.error = null;
      },
      userLogout: (state) =>
      {
         state.token = null;
         state.user = null;
      }
   },
   extraReducers: (builder) =>
   {
      // Register
      builder
         .addCase(authRegister.pending, (state) =>
         {
            state.loading = true;
            state.error = null;
         })
         .addCase(authRegister.fulfilled, (state) =>
         {
            state.loading = false;
            state.error = null;
         })
         .addCase(authRegister.rejected, (state, { payload }) =>
         {
            state.loading = false;
            if (isString(payload))
               state.error = payload;
         })

      // Login
      builder
         .addCase(authLogin.pending, (state) =>
         {
            state.loading = true;
            state.error = null;
         })
         .addCase(authLogin.fulfilled, (state, { payload }) =>
         {
            state.loading = false;
            state.error = null;
            state.token = payload.accessToken;
            state.user = jwtDecode(payload.accessToken);
         })
         .addCase(authLogin.rejected, (state, { payload }) =>
         {
            state.loading = false;
            if (isString(payload))
            {
               state.error = payload;
            }
         })
   }
});


export const { clearAuthUI, userLogout } = authSlice.actions;
export default authSlice.reducer;