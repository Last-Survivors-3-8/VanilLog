'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import firebaseApp from './components/Firebase/firebase';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <div>메인화면</div>
      {!isLoggedIn && (
        <Link href='/auth/login'>
          <button>로그인</button>
        </Link>
      )}
    </div>
  );
}
