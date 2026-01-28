'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { hrPostedJobs } from '../libs/utils/get-datas';
import { FooterNav, PostedJobCard, PostedJobsHeading } from './_components';

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [checkingUser, setCheckingUser] = useState<boolean>(true);
  const { getToken } = useAuth();
  console.log({ user });
  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push('/sign-in');
      return;
    }

    const checkUser = async () => {
      const token = await getToken();
      try {
        await axios.get('http://localhost:4000/user/check', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCheckingUser(false);
      } catch (error: any) {
        if (error.response?.status === 404) router.push('/complete-profile');
      }
    };

    checkUser();
  }, [user, isLoaded, router]);

  if (!user || !isLoaded || checkingUser)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader className="animate-spin" size={32} />
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col pb-20">
      <PostedJobsHeading hrPostedJobs={hrPostedJobs} />

      <div className="p-5 flex flex-col gap-3">
        {hrPostedJobs.map((job) => (
          <PostedJobCard job={job} key={job._id} />
        ))}
      </div>

      <FooterNav />
    </div>
  );
}
