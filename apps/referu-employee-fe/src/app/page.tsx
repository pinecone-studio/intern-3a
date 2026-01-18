'use client';

import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { hrPostedJobs } from '../libs/utils/get-datas';
import { FooterNav, Header } from './_components';

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [user, isLoaded, router]);

  if (!user && !isLoaded)
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col">
      <Header />

      <div>
        {hrPostedJobs.map((job) => (
          <div key={job._id}>{job.jobTitle}</div>
        ))}
      </div>

      <FooterNav />
    </div>
  );
}
