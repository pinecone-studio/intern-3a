'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export const useFavoriteClubs = () => {
  const [favoriteClubs, setFavoriteClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      setLoading(false);
      setFavoriteClubs([]);
      return;
    }

    const fetchFavoriteClubs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/my-favorite-clubs');

        if (!response.ok) {
          setFavoriteClubs([]);
          setLoading(false);
          return;
        }

        const data = await response.json();

        setFavoriteClubs(data.favoriteClubs || []);
      } catch (err) {
        console.error('Error fetching favorite clubs:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setFavoriteClubs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteClubs();
  }, [isLoaded, isSignedIn]);
  return { favoriteClubs, loading, error };
};
