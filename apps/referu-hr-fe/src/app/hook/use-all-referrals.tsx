'use client';

import { ReferralType } from '@/lib/type';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useAllReferrals = () => {
  const [allReferralsHR, setAllReferralsHR] = useState<ReferralType[]>([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  console.log({ allReferralsHR });

  useEffect(() => {
    const getReferrals = async () => {
      try {
        const token = await getToken();

        setLoading(true);
        const res = await axios.get('http://localhost:4000/hr/referral', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllReferralsHR(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getReferrals();
  }, []);

  return {
    allReferralsHR,
    loading,
  };
};
