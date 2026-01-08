'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export const useFavoriteClubs = () => {
  const [favoriteClubs, setFavoriteClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    // Don't fetch if Clerk hasn't loaded yet
    if (!isLoaded) {
      return;
    }

    // If not signed in, set empty state
    if (!isSignedIn) {
      setLoading(false);
      setFavoriteClubs([]);
      return;
    }

    const fetchFavoriteClubs = async () => {
      try {
        setLoading(true);
        console.log('useFavoriteClubs - Fetching favorites...');
        const response = await fetch('/api/my-favorite-clubs');

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
          // If not authorized or error, just set empty array instead of throwing
          console.warn(`API returned status ${response.status}, setting empty favorites`);
          setFavoriteClubs([]);
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log('Raw API response:', data);
        console.log('favoriteClubs from response:', data.favoriteClubs);
        console.log('favoriteClubs length:', data.favoriteClubs?.length);

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
