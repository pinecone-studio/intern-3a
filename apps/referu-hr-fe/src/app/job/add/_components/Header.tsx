import { Button } from '@intern-3a/shadcn';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Header = () => {
  const router = useRouter();
  const handleCancel = () => {
    router.push('/');
  };
  return (
    <div>
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Зар нэмэх</h1>
        </div>
      </header>
    </div>
  );
};
