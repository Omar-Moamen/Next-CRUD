import RegisterForm from "@/components/forms/RegisterForm/RegisterForm";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const Register = () =>
{
   return (
      <ProtectedRoute>
         <RegisterForm />
      </ProtectedRoute>
   )
}

export default Register;
