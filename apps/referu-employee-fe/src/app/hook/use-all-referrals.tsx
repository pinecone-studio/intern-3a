'use client';

import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ReferralType } from '../../libs/type';

export const useAllReferrals = () => {
  const [allReferrals, setAllReferrals] = useState<ReferralType[]>([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  console.log({ allReferrals });

  useEffect(() => {
    const getReferrals = async () => {
      try {
        const token = await getToken();

        setLoading(true);
        const res = await axios.get('http://localhost:4000/referral', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllReferrals(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getReferrals();
  }, []);

  return {
    allReferrals,
    loading,
  };
};
