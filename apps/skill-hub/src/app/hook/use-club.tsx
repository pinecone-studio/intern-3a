'use client';

import { ablyClient } from '@/lib/ably';
import { NewClubType } from '@/lib/utils/types';
import type * as Ably from 'ably';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useClub = () => {
  const [allClubs, setAllClubs] = useState<NewClubType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getClubs = async () => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/get-all-clubs');

      if (!res.ok) {
        toast.error('No clubs found!');
      }

      const { data } = await res.json();
      console.log(data);
      setAllClubs(data);
    } catch (error) {
      console.error('Error while loading clubs info!', error);
      toast.error('Failed to load clubs!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClubs();

    ablyClient.connection.on('connected', () => {
      console.log('⚡ Ably connected!');
    });

    const channel = ablyClient.channels.get('clubs');

    const handleCreated = (message: Ably.Message) => {
      if (message.name !== 'club-created') return;

      const clubCreated = message.data as NewClubType;

      setAllClubs((prev) => {
        if (prev.some((club) => club._id === clubCreated._id)) return prev;
        return [...prev, clubCreated];
      });

      toast.success('New club added!');
    };

    const handleUpdated = (message: Ably.Message) => {
      if (message.name !== 'club-updated') return;
      const updatedClub = message.data as NewClubType;

      setAllClubs((prev) => prev.map((club) => (club._id === updatedClub._id ? updatedClub : club)));
      toast.success('Club updated!');
    };

    const handleDeleted = (message: Ably.Message) => {
      if (message.name !== 'club-deleted') return;
      const deleted = message.data as { _id: string };

      setAllClubs((prev) => prev.filter((club) => club._id !== deleted._id));
      toast.success('Club deleted!');
    };

    channel.subscribe('club-created', handleCreated);
    channel.subscribe('club-updated', handleUpdated);
    channel.subscribe('club-deleted', handleDeleted);

    return () => {
      channel.unsubscribe('club-created', handleCreated);
      channel.unsubscribe('club-updated', handleUpdated);
      channel.unsubscribe('club-deleted', handleDeleted);
    };
  }, []);

  return { allClubs, isLoading };
};
