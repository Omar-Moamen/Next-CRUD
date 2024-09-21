"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/components/validations/loginSchema";
import useAuthInfo from "@/components/hooks/useAuthInfo";
import { authLogin } from "@/store/auth/actions/authLogin";
import { clearAuthUI } from "@/store/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordInput from "../PasswordInput/PasswordInput";
import ErrorFeedback from "@/components/feedback/ErrorFeedback/ErrorFeedback";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material"
import Form from "../Form/Form";
import Link from "next/link";
// Styles
import styles from './styles.module.css';




type TLoginInputs = z.infer<typeof loginSchema>

const { LogForm } = styles;

const LoginForm = () =>
{
   const { dispatch, loading, error } = useAuthInfo();
   const router = useRouter();
   const search = useSearchParams().get('message');

   const {
      register,
      handleSubmit,
      formState: { errors } } =
      useForm<TLoginInputs>({
         mode: "onBlur",
         resolver: zodResolver(loginSchema),
      });

   const [showPassword, setShowPassword] = useState(false);

   //Effects
   useEffect(() =>
   {
      return () => { dispatch(clearAuthUI()); }
   }, [dispatch])

   // Handlers
   const onSubmit: SubmitHandler<TLoginInputs> = async (formData) =>
   {
      dispatch(authLogin(formData))
         .unwrap()
         .then(() => router.push('/'))
         .catch(err => err = error)
      //! .then(() => setSearchParams(""))
      // (err = error) to avoid crashing the app.. already handled error below
   }

   const handleShowPassword = (): void => setShowPassword(!showPassword);

   return (
      <Form
         className={`neonForm ${LogForm}`}
         heading="Login"
         onSubmit={handleSubmit(onSubmit)}
      >
         {
            search === "account_created" ? (
               <Alert severity="success">
                  Your account successfully created, please login
               </Alert>
            ) :
               search === "login_required" && (
                  <Alert severity="warning">
                     Please login first
                  </Alert>
               )
         }
         <TextField
            id="email"
            {...register('email')}
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
         />
         <PasswordInput
            id='password'
            label='Password'
            register={register}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            error={(errors.password?.message)!}
         />

         <ErrorFeedback error={error} />

         <Box mt="20px"
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap="15px"
            alignItems="center"
         >
            <Button
               type="submit"
               sx={{ width: { xs: "100%", sm: "fit-content" } }}
               variant="outlined"
               size="large"
               disabled={!!(loading === "pending")}
            >
               {loading === "pending" && <CircularProgress sx={{ mr: '10px' }} size={20} />}
               Login
            </Button>
            <Button
               sx={{
                  width: { xs: "100%", sm: "fit-content" },
                  ml: "auto",
                  fontWeight: "bold"
               }}
               type="button"
               variant="outlined"
               color="secondary"
               size="large"
               component={Link}
               href='/register'
            >
               Register
            </Button>
         </Box>
      </Form >
   )
}

export default LoginForm;
