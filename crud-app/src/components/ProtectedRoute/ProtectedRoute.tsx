"use client";

import { permanentRedirect, usePathname } from "next/navigation";
import useAuthInfo from "../hooks/useAuthInfo";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) =>
{
   const { token } = useAuthInfo();
   const pathname = usePathname();

   if ((pathname === "/profile" || pathname === "/") && !token)
   {
      return permanentRedirect("/login?message=login_required");
   }

   if ((pathname === "/login" || pathname === "/register") && token)
   {
      return permanentRedirect("/");
   }

   return (
      <>
         {children}
      </>
   )
}

export default ProtectedRoute;
