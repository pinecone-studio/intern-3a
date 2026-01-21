'use client';

import { useUser } from '@clerk/nextjs';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/api/graphql' }),
  //URI нь граф киү эл бакэндийг тавьж өгнө.
  cache: new InMemoryCache(),
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push('/login');
      return;
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
