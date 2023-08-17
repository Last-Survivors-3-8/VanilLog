'use client';
import authService from '../../components/Service/authService';

export const onLogin = () => {
  authService.login().catch((error) => {
    error;
  });
};

export default onLogin;
