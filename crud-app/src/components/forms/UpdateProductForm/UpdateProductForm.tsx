"use client";

import { useForm, SubmitHandler } from "react-hook-form"
import { actUpdateProduct } from "../../../store/products/act/actUpdateProduct";
import useProductDetails from "@/components/hooks/useProductDetails";
import { useEffect } from "react";
import ErrorFeedback from "../../feedback/ErrorFeedback/ErrorFeedback";
import { TProduct } from "../../../types/product";
import { Button, CircularProgress, Container, TextField } from "@mui/material";
import Form from "../Form/Form";
import { useAppSelector } from "../../../store/rtkHooks";
import { useRouter } from "next/navigation";
import { TToken } from "../../../types/shared";
// Styles
import styles from './styles.module.css';

const { UpdateForm } = styles;

const UpdateProductForm = () =>
{
   const { token } = useAppSelector(state => state.auth);
   const { dispatch, productInfo, loading, error } = useProductDetails();
   const { register, handleSubmit, reset, formState: { errors } } = useForm<TProduct>();
   const router = useRouter()

   useEffect(() =>
   {
      if (productInfo)
      {
         reset({
            title: productInfo?.title,
            price: productInfo?.price,
            quantity: productInfo?.quantity,
         })
      }

      return () => { reset(); };
   }, [productInfo, reset])

   const onSubmit: SubmitHandler<TProduct> = (data) =>
   {
      const { quantity } = data;
      const convertedQuantity = Number(Math.floor(quantity));

      if ((productInfo && productInfo["_id"]))
      {
         const productWithToken: TProduct & { token: TToken } = {
            ...data,
            quantity: convertedQuantity,
            _id: productInfo["_id"],
            token,
         };
         dispatch(actUpdateProduct(productWithToken))
            .unwrap()
            .then(() => reset())
            .then(() => router.push('/'))
            .catch(err => err = error);
         // err = error to avoid crashing the app.. already handled error below
      }
   }

   return (
      <Container sx={{ minHeight: 'calc(100vh - 150px)' }} maxWidth="lg">
         <Form
            className={`neonForm ${UpdateForm}`}
            heading="Edit Product"
            onSubmit={handleSubmit(onSubmit)}
         >
            <TextField
               id="title"
               {...register('title')}
               label="Title"
               variant="outlined"
               slotProps={{ inputLabel: { shrink: true } }}
               error={!!errors.title}
               helperText={errors.title?.message}
            />
            <TextField
               id="price"
               {...register('price')}
               label="Price"
               variant="outlined"
               slotProps={{ inputLabel: { shrink: true } }}
               error={!!errors.price}
               helperText={errors.price?.message}
            />
            <TextField
               id="Quantity"
               {...register('quantity')}
               label="Quantity"
               variant="outlined"
               slotProps={{ inputLabel: { shrink: true } }}
               error={!!errors.quantity}
               helperText={errors.quantity?.message}
            />
            <Button
               type="submit"
               variant="outlined"
            >
               {
                  loading === "pending" &&
                  <CircularProgress sx={{ mr: '10px' }} size={20} />
               }
               Submit
            </Button>
            <ErrorFeedback error={error} />
         </Form>
      </Container>
   )
}

export default UpdateProductForm
