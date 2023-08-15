'use client';

import React from 'react';
import AuthService from '../authService';

const authService = new AuthService();

const Login = () => {
  const onLogin = () => {
    authService
      .login()
      .then((result) => {
        console.log('User logged in:', result.user);
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

  return (
    <section>
      <h2>Login</h2>
      <li>
        <button onClick={onLogin}>Google</button>
      </li>
    </section>
  );
};

export default Login;
