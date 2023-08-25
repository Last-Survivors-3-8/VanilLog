import Link from 'next/link';
import { LoginButton } from '@src/app/_components/LoginButton';

function LoginPage() {
  return (
    <div className='text-center font-sans'>
      <div className='mt-32 mb-20'>
        <Link href='/'>
          <span className='text-9xl text-logo font-bold'>vanilLog</span>
        </Link>
      </div>
      <div>
        <LoginButton loginCompany='google' />
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
