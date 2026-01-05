'use client';

import { useEffect, useState } from 'react';

export function useClubById(id: string) {
  const [club, setClub] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchClub() {
      try {
        setLoading(true);
        const res = await fetch(`/api/club/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');

        const result = await res.json();

        setClub(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchClub();
  }, [id]);

  return { club, loading, error };
}
