import { useContext } from "react";
import { AuthContext } from "./authContext";

// ✅ FIXED hook (this was breaking your app)

export const useAuth = () => {
  return useContext(AuthContext);
};
