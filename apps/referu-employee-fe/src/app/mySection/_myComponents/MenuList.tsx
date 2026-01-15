import { Card, CardContent } from '@intern-3a/shadcn';
import { ChevronRight } from 'lucide-react';
import React from 'react';

const MenuList = () => {
  return (
    <Card className="border">
      <CardContent className="p-0">
        <button className="w-full flex items-center justify-between p-5 hover:bg-accent transition-colors">
          <span className="font-medium">Санал болгосон түүх</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </CardContent>
    </Card>
  );
};

export default MenuList;
