import { Logout } from "iconsax-react";
import { Button } from './ui/button';
import api from '@/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { t } from "i18next";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null); 
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleLogout}
      className="w-full justify-start text-red-600 hover:text-red-400 border-b"
    >
      <Logout variant="Outline" color="red" className="ltr:rotate-180" />
      <span>{t("sidebar.logout")}</span>
    </Button>
  );
}