'use client';

import { useEffect, useState } from 'react';

export type RegistrationType = {
  _id: string;
  status: 'PENDING' | 'ACCEPTED' | 'CANCELED';
  userId: {
    _id: string;
    firstName: string;
    email: string;
  };
  projectId: {
    _id: string;
    title: string;
  };
};

export const useRegistrations = (projectId?: string) => {
  const [data, setData] = useState<RegistrationType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRegistrations = async () => {
    if (!projectId) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/registrations?projectId=${projectId}`);
      const json = await res.json();
      setData(json.data || []);
    } catch (error) {
      console.error('Failed to fetch registrations', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [projectId]);

  return { registrations: data, loading, refetch: fetchRegistrations };
};
