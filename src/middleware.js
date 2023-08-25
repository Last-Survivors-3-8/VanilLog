export { default } from 'next-auth/middleware';

// login authentication 미들웨어
// 배포 테스트
// https://next-auth.js.org/configuration/nextjs
export const config = { matcher: ['/profile/(.*)', '/post/editor/(.*)'] };
