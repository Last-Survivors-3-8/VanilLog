'use client';

import AuthService from '../Service/authService';
import Router from 'next/router';

const authService = new AuthService();

export const onLogin = () => {
  authService.login().catch((error) => {
    console.error('Error during login:', error);
  });
};

export default onLogin;
