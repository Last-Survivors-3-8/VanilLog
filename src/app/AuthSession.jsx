'use client';

import { Navbar } from '@src/app/_components/Navbar';
import { SideNavbar } from '@src/app/_components/SideNavbar/SideNavbar';
import { SessionProvider } from 'next-auth/react';

function AuthSession({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      <div className='mt-[45px]'>
        <SideNavbar />
        {children}
      </div>
    </SessionProvider>
  );
}

export { AuthSession };
