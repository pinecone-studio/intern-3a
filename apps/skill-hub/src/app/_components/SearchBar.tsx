import React from 'react';
import { useClub } from '../hook/use-club';

export const SearchBar = () => {
  const { allClubs, isLoading } = useClub();

  console.log('allclubs and isloading', allClubs, isLoading);
  return <div>Searchbar</div>;
};
