'use client';

import React from 'react';
import AuthService from '../authService';

const authService = new AuthService();

const Login = () => {
  const onLogin = () => {
    authService
      .login()
      .then((result) => {
        // 로그인에 성공한 경우에 실행할 코드
        console.log('User logged in:', result.user);
      })
      .catch((error) => {
        // 로그인에 실패한 경우에 실행할 코드
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
