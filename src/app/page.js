import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div>메인화면</div>
      <Link href='/auth/login'>
        <button>로그인</button>
      </Link>
    </div>
  );
}
