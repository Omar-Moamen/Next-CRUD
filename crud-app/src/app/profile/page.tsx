"use client";

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const Profile = () =>
{

   return (
      <ProtectedRoute>
         <h1>Profile</h1>
      </ProtectedRoute>
   )
}

export default Profile;
