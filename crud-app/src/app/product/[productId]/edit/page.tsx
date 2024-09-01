"use client"

import UpdateProductForm from "@/components/forms/UpdateProductForm/UpdataProductForm";
import useAuthInfo from "@/components/hooks/useAuthInfo";
import Link from "next/link";

const Edit = () =>
{
   const { user, token } = useAuthInfo();

   if (!token || (user?.role !== "SuperAdmin"))
   {
      return <Link href='/' replace={true} />
   }

   return (
      <>
         <UpdateProductForm />
      </>
   )
}

export default Edit;
