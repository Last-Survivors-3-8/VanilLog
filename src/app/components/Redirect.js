import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectComponent = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return <div>Redirecting...</div>;
};

export default RedirectComponent;
