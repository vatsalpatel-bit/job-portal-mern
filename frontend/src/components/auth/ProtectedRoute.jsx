import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Logged in → show page
  return children;
};

export default ProtectedRoute;