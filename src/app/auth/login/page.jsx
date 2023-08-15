'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
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
    <div className='text-center font-sans'>
      <div className='mt-32 mb-20'>
        <Link href='/'>
          <span className='text-9xl text-logo font-bold'>vanilLog</span>
        </Link>
      </div>
      <div>
        <button
          onClick={onLogin}
          className='text-xl text-white font-bold bg-[#0044ff] rounded-lg hover:bg-[#0000ff] py-2 px-8'
        >
          google login
        </button>
      </div>
      <div className='my-8'>
        <Link href='/'>
          <button className='underline hover:font-bold'>
            비회원으로 둘러보기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
