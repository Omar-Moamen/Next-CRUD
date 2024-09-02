"use client"

import Loading from "@/components/feedback/Loading/Loading";
import UpdateProductForm from "@/components/forms/UpdateProductForm/UpdateProductForm";
import useAuthInfo from "@/components/hooks/useAuthInfo";
import { permanentRedirect } from "next/navigation";

const Edit = () =>
{
   const { user, token, loading, error } = useAuthInfo();

   if (!token || (user?.role !== "SuperAdmin"))
   {
      return permanentRedirect("/");
   }

   return (
      <Loading status={loading} error={error}>
         <UpdateProductForm />
      </Loading>
   )
}

export default Edit;
