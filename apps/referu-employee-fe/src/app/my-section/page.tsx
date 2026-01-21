import React from 'react';

import { Header, MenuItem, ProfileCard } from './_components';
import { mockEmployee } from './_components/mockEmployee';

const MySection = () => {
  return (
    <div className="min-h-screen bg-blue-50/50">
      <Header />
      <div className="p-4 space-y-4">
        {mockEmployee.map((emp) => (
          <ProfileCard key={emp._id} employee={emp} />
        ))}
        <MenuItem />
      </div>
    </div>
  );
};
export default MySection;
