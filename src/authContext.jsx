import { createContext, useState, useEffect } from "react";
import LoadingScreen from "./loadingScreen.jsx";
//eslint-disable-next-line
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ prevent blank crash

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://cms-backend-xyb9.onrender.com/api/user/me", {
          credentials: "include",
        });

        if (!response.ok) {
          setUser(null); // ✅ if not logged in
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        setUser(data); // or data.user (depends on backend)
      } catch (error) {
        console.log("Auth error:", error);
        setUser(null);
      } finally {
        setLoading(false); // ✅ always stop loading
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

