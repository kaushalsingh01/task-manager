import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>; // Optional: Show a spinner or loader here.
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Ensure children are rendered correctly
};

export default ProtectedRoute;
