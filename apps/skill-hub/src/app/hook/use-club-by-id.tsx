import { useEffect, useState } from 'react';

export function useClubById(id: string) {
  const [club, setClub] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClub() {
      try {
        const res = await fetch(`/api/clubs/${id}`);
        const data = await res.json();
        setClub(data);
      } finally {
        setLoading(false);
      }
    }

    fetchClub();
  }, [id]);

  return { club, loading };
}
