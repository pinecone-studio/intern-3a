'use client';

import { NewClubType } from '@/lib/utils/types';
import { Button, Dialog, DialogTrigger } from '@intern-3a/shadcn';
import { useState } from 'react';
import { EditClassLevelInfo } from './EditClassLevelInfo';

type EditMyClubsTriggerProps = {
  club: NewClubType;
};

export const EditClassLevelInfoTrigger = ({ club }: EditMyClubsTriggerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-sm rounded-lg bg-[#0A427A] hover:bg-[#093662]">Анги засах</Button>
      </DialogTrigger>

      <EditClassLevelInfo club={club} setOpen={setOpen} />
    </Dialog>
  );
};
