'use client'

import
{
   Container,
   Card,
   CardMedia,
   CardContent,
   Typography,
} from "@mui/material";
import useProductDetails from "@/components/hooks/useProductDetails";
import Loading from "@/components/feedback/Loading/Loading";
import useAuthInfo from "@/components/hooks/useAuthInfo";
import ErrorFeedback from "@/components/feedback/ErrorFeedback/ErrorFeedback";
import Link from "next/link";
import { TProductIdProps } from "@/types/product";

const ProductId = ({ params }: TProductIdProps) =>
{
   const { productId } = params;
   const { productInfo, loading, error } = useProductDetails(productId);
   const { token, user } = useAuthInfo();

   if (!token || (user?.sub !== "Admin" && user?.sub !== "SuperAdmin"))
   {
      return <Link href="/" replace={true} />
   }

   if (error)
   {
      return <ErrorFeedback error={error} />
   }

   return (
      <Container maxWidth="lg">

         <Loading status={loading} error={error} size="150px">
            <Card sx={{ maxWidth: 345, objectPosition: "0 -160px" }}>
               <CardMedia
                  component="img"
                  alt={productInfo?.title}
                  height="280"
                  image="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
               />
               <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                     {productInfo?.title}
                  </Typography>
                  <Typography mb="10px" variant="subtitle1" color="primary">
                     Price: &#36;{productInfo?.price}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                     Quantity: {productInfo?.quantity}
                  </Typography>
               </CardContent>
            </Card>
         </Loading>
      </Container>
   )
}

export default ProductId;
