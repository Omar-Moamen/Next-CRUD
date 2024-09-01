"use client"

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/rtkHooks"
import { actGetSingleProduct } from "@/store/products/act/actGetSingleProduct";
import { cleanProductInfo } from "@/store/products/productsSlice";
import { useParams } from "next/navigation";

type TProductId = { productId: string }

const useProductDetails = () =>
{
   const dispatch = useAppDispatch();
   const { token } = useAppSelector(state => state.auth)
   const { productInfo, loading, error } = useAppSelector(state => state.products);

   const { productId } = useParams<TProductId>();

   useEffect(() =>
   {
      if (token && productId)
      {
         const productIdWithToken = { _id: productId, token, }
         dispatch(actGetSingleProduct(productIdWithToken))

         return () =>
         {
            dispatch(cleanProductInfo());
         }
      }
   }, [dispatch, productId, token])

   return { productInfo, loading, error, dispatch }
}

export default useProductDetails;
