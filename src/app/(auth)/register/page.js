import Register from '@/components/auth/Register/Register';
import { verifyCookie } from '@/lib/cookies';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async () => {
  const isUserLoggedIn = await verifyCookie();

  if (isUserLoggedIn.user.hasOwnProperty('userId')) {
    // User is logged in
    redirect('/admin');
  }
  return <Register />;
};

export default Page;
