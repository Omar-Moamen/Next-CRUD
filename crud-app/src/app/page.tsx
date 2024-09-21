import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute"
import Home from "./home/page"

const App = () =>
{

   return (
      <ProtectedRoute>
         <Home />
      </ProtectedRoute>
   )
}

export default App
