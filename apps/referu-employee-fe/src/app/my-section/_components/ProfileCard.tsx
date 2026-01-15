import { Card, CardContent } from '@intern-3a/shadcn';
import { User } from 'lucide-react';
import React from 'react';

export const ProfileCard = () => {
  return (
    <Card className="border">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base">Б. Батжаргал</h3>
            <p className="text-sm text-muted-foreground">EMP-2024-001</p>
            <p className="text-sm text-muted-foreground">Технологийн алба</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
