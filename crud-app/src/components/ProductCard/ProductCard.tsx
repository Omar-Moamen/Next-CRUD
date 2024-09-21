"use client";

import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import useProductDetails from "../hooks/useProductDetails";
import useAuthInfo from "../hooks/useAuthInfo";
import { permanentRedirect } from "next/navigation";
import ErrorFeedback from "../feedback/ErrorFeedback/ErrorFeedback";
import Loading from "../feedback/Loading/Loading";

// type TProductCard = {
//    title: string,
//    price: number,
//    quantity: number,
// }

const ProductCard = () =>
{
   const { productInfo, error } = useProductDetails();
   const { title, price, quantity } = productInfo || {};
   const { token, loading, user } = useAuthInfo();

   if (!token || (user?.role !== "Admin" && user?.role !== "SuperAdmin"))
   {
      return permanentRedirect('/');
   }

   if (error)
   {
      return <ErrorFeedback error={error} />
   }

   return (
      <Loading status={loading} error={error} size="150px">
         <Card sx={{
            maxWidth: 345,
            objectPosition: "0 -160px",
            position: "relative"
         }}>
            <CardMedia
               component="img"
               alt={title}
               height="280"
               image="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
            />
            <CardContent>
               <Typography gutterBottom variant="h6" component="h6">
                  {title}
               </Typography>
               <Typography mb="10px" variant="subtitle1" color="primary">
                  Price: <span style={{ color: "whitesmoke" }}>&#36;{price}</span>
               </Typography>
               <Typography variant="subtitle1" color="primary">
                  Quantity: <span style={{ color: "whitesmoke" }}>{quantity}</span>
               </Typography>
            </CardContent>
         </Card>
      </Loading>
   )
}

export default ProductCard
