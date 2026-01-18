'use client';

import { Button } from '@intern-3a/shadcn';

import React from 'react';

export const ReferPageFooterNav = () => {
  const handleSendReferRequest = () => {
    alert('working');
  };
  return (
    <div className="h-18 fixed bottom-0 left-0 right-0 flex items-center gap-3 bg-card border-t border-border/50 shadow-lg z-50 px-5">
      <Button onClick={handleSendReferRequest} className="bg-[#005295] hover:bg-[#005295]/90 flex-1 cursor-pointer">
        Илгээх
      </Button>
    </div>
  );
};
