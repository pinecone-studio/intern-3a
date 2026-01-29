import React from 'react';

import { Header, MenuItem, ProfileCard } from './_components';

const MySection = () => {
  return (
    <div className="min-h-screen bg-blue-50/50">
      <Header />
      <div className="p-4 space-y-4">
        <ProfileCard />

        <MenuItem />
      </div>
    </div>
  );
};
export default MySection;
