import LoginForm from '@/components/forms/LoginForm/LoginForm'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'

const Login = () =>
{

   return (
      <ProtectedRoute>
         <LoginForm />
      </ProtectedRoute>
   )
}

export default Login
