import { Skeleton } from '@intern-3a/shadcn';
import React from 'react';

export const MapCardSkeleton = () => {
  return (
    <div className="p-4 border-b bg-white flex flex-col gap-2">
      <Skeleton className="w-full h-32 rounded-md bg-gray-300" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-32 bg-gray-300" />
        <Skeleton className="h-4 w-4 rounded-full bg-gray-300" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <Skeleton className="h-5 w-16 rounded-full bg-gray-300" />
          <Skeleton className="h-5 w-16 rounded-full bg-gray-300" />
        </div>
        <Skeleton className="h-4 w-4 bg-gray-300" />
      </div>
    </div>
  );
};
