import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";
import i18n from "@/i18n";
import { useTheme } from "@/components/themeProvider";
import { updateDocumentDirection } from "@/utils/updateDocumentDirection";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
        i18n.changeLanguage(response?.data?.language);
        updateDocumentDirection(response?.data?.language);
        setTheme(response?.data?.theme);
        return response.data;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
