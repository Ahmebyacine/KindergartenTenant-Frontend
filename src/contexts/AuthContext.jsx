import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";
import i18n from "@/i18n";
import { useTheme } from "@/components/themeProvider";
import { updateDocumentDirection } from "@/utils/updateDocumentDirection";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
        i18n.changeLanguage(response?.data?.user.language);
        updateDocumentDirection(response?.data?.user.language);
        setTheme(response?.data?.user.theme);
        setConfig(response.data.config)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, config, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
