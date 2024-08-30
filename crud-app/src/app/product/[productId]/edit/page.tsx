"use client"

import UpdateProductForm from "@/components/forms/UpdateProductForm/UpdataProductForm";
import useAuthInfo from "@/components/hooks/useAuthInfo";
import { TProductIdProps } from "@/types/product";
import Link from "next/link";

const Edit = ({ params }: TProductIdProps) =>
{
   const { productId } = params;
   const { user, token } = useAuthInfo();

   if (!token || (user?.sub !== "SuperAdmin"))
   {
      return <Link href='/' replace={true} />
   }

   return (
      <>
         <UpdateProductForm productId={productId} />
      </>
   )
}

export default Edit;
