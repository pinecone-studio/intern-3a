// app/hook/use-projects.ts
'use client';

import { ablyClient } from '@/lib/ably';
import { ClubProjectType } from '@/lib/utils/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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

    const channel = ablyClient.channels.get(`club-${clubId}-projects`);

    const handleCreated = (message: any) => {
      setProjects((prev) => {
        // already exists шалгах
        if (prev.some((p) => p._id === message.data._id)) return prev;
        return [...prev, message.data];
      });
      toast.success('New project added!');
    };

    channel.subscribe('project-created', handleCreated);

    return () => {
      channel.unsubscribe('project-created', handleCreated);
    };
  }, [clubId]);

  return { projects, loading };
};
