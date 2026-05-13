import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return user ? children : null;
};
export default ProtectedRoute;
