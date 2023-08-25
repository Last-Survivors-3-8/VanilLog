'use client';

import { signOut } from 'next-auth/react';

function LogoutButton() {
  const handleSignOut = () => signOut();

  return (
    <>
      <button id='logoutButton' onClick={handleSignOut}>
        Logout
      </button>
    </>
  );
}

export { LogoutButton };
