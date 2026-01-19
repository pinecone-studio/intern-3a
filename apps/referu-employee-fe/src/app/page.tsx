'use client';

import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { hrPostedJobs } from '../libs/utils/get-datas';
import { FooterNav, PostedJobCard, PostedJobsHeading } from './_components';

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
      <div className="min-h-screen flex justify-center items-center">
        <Loader className="animate-spin" />
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
