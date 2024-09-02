"use client";

import useProductDetails from "@/components/hooks/useProductDetails";
import Loading from "@/components/feedback/Loading/Loading";
import useAuthInfo from "@/components/hooks/useAuthInfo";
import ErrorFeedback from "@/components/feedback/ErrorFeedback/ErrorFeedback";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Container } from "@mui/material";
import { permanentRedirect } from "next/navigation";

const ProductId = () =>
{
   const { productInfo, loading, error } = useProductDetails();
   const { token, user } = useAuthInfo();

   if (!token || (user?.role !== "Admin" && user?.role !== "SuperAdmin"))
   {
      return permanentRedirect('/');
   }

   if (error)
   {
      return <ErrorFeedback error={error} />
   }

   return (
      <Container maxWidth="lg">
         <Loading status={loading} error={error} size="150px">
            <ProductCard productInfo={productInfo!} />
         </Loading>
      </Container>
   )
}

export default ProductId;
