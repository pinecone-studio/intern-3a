"use client"

import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Page from './homepage/page';

const HomePage = () => {
const {user, isLoaded} = useUser()
const router =useRouter()

useEffect(()=>{
  if (!isLoaded) return

  if (!user) {router.push("/sign-in")}
},[])

    if (!user || !isLoaded )
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  return (
    <div>
      <Page />
    </div>
  );
};
export default HomePage;
