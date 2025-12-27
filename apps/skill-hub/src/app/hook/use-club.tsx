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

    channel.subscribe('club-created', handleCreated);

    return () => {
      channel.unsubscribe('club-created', handleCreated);
    };
  }, []);

  return { allClubs, isLoading };
};
