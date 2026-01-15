import React from 'react';
import Header from './_myComponents/Header';

import MenuList from './_myComponents/MenuList';
import ProfileCard from './_myComponents/ProfileCard';

const page = () => {
  return (
    <div className="min-h-screen bg-blue-50/50">
      <Header></Header>
      <div className="p-4 space-y-4">
        <ProfileCard></ProfileCard>
        <MenuList></MenuList>
      </div>
    </div>
  );
};
export default page;
