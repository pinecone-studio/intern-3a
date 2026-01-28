'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ReferralType } from '../../libs/type';

export const useReferral = () => {
  const [allReferrals, setAllReferrals] = useState<ReferralType[]>([]);
  const [loading, setLoading] = useState(false);
  console.log({ allReferrals });
  const getReferrals = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:4000/referral');
      setAllReferrals(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReferrals();
  }, []);

  return {
    allReferrals,
    loading,
    refetch: getReferrals,
  };
};
