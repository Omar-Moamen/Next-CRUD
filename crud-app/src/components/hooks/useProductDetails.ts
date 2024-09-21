"use client"

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/rtkHooks"
import { getSingleProduct } from "@/store/products/actions/getSingleProduct";
import { cleanProductInfo } from "@/store/products/productsSlice";
import { useParams } from "next/navigation";

type TProductId = { productId: string }

const useProductDetails = () =>
{
   const dispatch = useAppDispatch();
   const { token } = useAppSelector(state => state.auth)
   const { productInfo, loading, error } = useAppSelector(state => state.products);
   const clearRef = useRef(false);

   const { productId } = useParams<TProductId>();

   useEffect(() =>
   {
      if (token && productId && clearRef.current === false)
      {
         const productIdWithToken = { _id: productId, token, }
         dispatch(getSingleProduct(productIdWithToken))

         return () =>
         {
            clearRef.current = true;
            dispatch(cleanProductInfo());
         }
      }
   }, [dispatch, productId, token])

   return { productInfo, loading, error, dispatch }
}

export default useProductDetails;
