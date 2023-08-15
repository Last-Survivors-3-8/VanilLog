'use client';

import React, { useEffect } from 'react';
import { onLogin } from '../../components/Login/login';
import AuthService from '../../components/Service/authService';

const authService = new AuthService();

function LoginPage() {
  useEffect(() => {
    authService
      .getLoginResult()
      .then((result) => {
        if (result.user) {
          console.log('User logged in:', result.user);
          window.location.href = '/';
        }
      })
      .catch((error) => {
        console.error('Error getting login result:', error);
      });
  }, []);
  return (
    <>
      <div className='text-center'>
        <span className='text-logo font-sans font-bold text-9xl'>vanilLog</span>
      </div>
      <div className='text-center'>
        <button onClick={onLogin}>google login</button>
      </div>
    </>
  );
}

export default LoginPage;
