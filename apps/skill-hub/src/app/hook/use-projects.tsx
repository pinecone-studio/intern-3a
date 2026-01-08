// app/hook/use-projects.ts
'use client';

import { ClubProjectType } from '@/lib/utils/types';
import { useEffect, useState } from 'react';

export const useProjects = (clubId: string | undefined) => {
  const [projects, setProjects] = useState<ClubProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clubId) return;

    fetch(`/api/projects?clubId=${clubId}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [clubId]);

  return { projects, loading };
};
