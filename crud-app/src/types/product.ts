type TProduct = {
   _id: string,
   title: string,
   price: number,
   quantity: number,
}

type TProductIdProps = {
   params: {
      productId: string
   }
};

export type { TProduct, TProductIdProps }