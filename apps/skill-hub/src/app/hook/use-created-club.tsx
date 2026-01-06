'use client';

import { NewClubType } from '@/lib/utils/types';
import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useClub } from './use-club';

export const useCreatedClubs = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { allClubs } = useClub();
  const [mongoUserId, setMongoUserId] = useState<string | null>(null);
  const [myCreatedClubs, setMyCreatedClubs] = useState<NewClubType[]>([]);

  const getMongoUserId = async () => {
    if (!user) return;
    try {
      const token = await getToken();
      const res = await fetch('/api/check-create-user', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch Mongo user ID');
      const data = await res.json();
      setMongoUserId(data.userId);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load user info!');
    }
  };

  useEffect(() => {
    getMongoUserId();
  }, [user]);

  useEffect(() => {
    if (!mongoUserId) return;
    setMyCreatedClubs(allClubs.filter((club) => club.adminId === mongoUserId));
  }, [allClubs, mongoUserId]);

  return { myCreatedClubs };
};
