'use client';

import { useEffect } from 'react';

export default function SyncUser() {
  useEffect(() => {
    fetch('/api/auth/sync-user', {
      method: 'POST',
      credentials: 'include',
    });
  }, []);

  return null;
}
