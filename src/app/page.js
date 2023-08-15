'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import firebaseApp from './components/Firebase/firebase';
import axios from 'axios';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  const fetchUserInfo = () => {
    const auth = getAuth(firebaseApp);
    if (auth.currentUser) {
      auth.currentUser.getIdToken(true).then((idToken) => {
        console.log('Retrieved idToken:', idToken);
        axios
          .get('http://localhost:3001/getUserInfo', {
            headers: {
              Authorization: 'Bearer ' + idToken,
            },
          })
          .then((response) => {
            setUserInfo(response.data);
          })
          .catch((error) => {
            console.error('API 요청 중 에러 발생:', error);
          });
      });
    } else {
      console.error('로그인한 사용자가 아닙니다.');
    }
  };

  return (
    <div>
      <div>메인화면</div>
      {isLoggedIn && (
        <div>
          {userInfo ? (
            <div>{userInfo.uid}님 환영합니다!</div>
          ) : (
            <button onClick={fetchUserInfo}>사용자 정보 가져오기</button>
          )}
        </div>
      )}
      {!isLoggedIn && (
        <Link href='/auth/login'>
          <button>로그인</button>
        </Link>
      )}
    </div>
  );
}
