'use client';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { EmployeeType } from '../libs/type';
import { hrPostedJobs } from '../libs/utils/get-datas';
import { FooterNav, PostedJobCard, PostedJobsHeading } from './_components';

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [user, isLoaded, router]);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const createUser = async () => {
      setIsSubmitting(true);

      const userData: EmployeeType = {
        employeeClerkId: '1',
        employeeLastName: '2',
        employeeFirstName: '3',
        employeeEmail: '4444444',
        employeeTelNumber: '5',
        employeeDepartment: '6',
        employeeJobTitle: '7',
        employeeJobType: 'SHIFT_BASED',
        employeeJobLevel: 'UNIT_HEAD',
      };

      try {
        const response = await axios.post('http://localhost:4000/user', userData, { headers: { 'Content-Type': 'application/json' } });

        toast.success(response.data.message);
      } catch (error: any) {
        if (error.response?.data?.error) {
          toast.error(`Алдаа: ${JSON.stringify(error.response.data.error)}`);
        } else {
          toast.error('Алдаа гарлаа');
        }
        console.error('User creation error:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
    createUser();
  }, [isLoaded, user]);

  if (!user || !isLoaded || isSubmitting)
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
