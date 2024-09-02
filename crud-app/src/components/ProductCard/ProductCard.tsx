import { Card, CardMedia, CardContent, Typography } from "@mui/material";

type TProductCardProps = {
   productInfo: {
      title: string,
      price: number,
      quantity: number,
   }
}

const ProductCard = ({ productInfo }: TProductCardProps) =>
{
   return (
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
   )
}

export default ProductCard
