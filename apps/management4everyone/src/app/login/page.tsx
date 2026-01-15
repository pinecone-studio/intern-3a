'use client';
import { SignIn } from '@clerk/nextjs';
import React from 'react';

const Login = () => {
  console.log('Rendering SignIn page');
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <SignIn routing="hash" />
    </div>
  );
};

export default Login;
