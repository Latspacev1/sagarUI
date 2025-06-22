import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLoginSuccess = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else if (user?.role === 'facility_head') {
      navigate('/facility');
    }
  };

  React.useEffect(() => {
    if (user) {
      handleLoginSuccess();
    }
  }, [user]);

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};