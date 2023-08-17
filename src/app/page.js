'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import authService from './components/Service/authService';

export default function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = authService.auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div>메인화면</div>
      {user ? (
        <div>
          {user.displayName}님 환영합니다!
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link href='/auth/login'>로그인</Link>
      )}
      {error && <div className='error'>{error}</div>}
    </div>
  );
}
