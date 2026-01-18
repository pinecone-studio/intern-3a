'use client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/api/graphql' }),
  //URI нь граф киү эл бакэндийг тавьж өгнө.
  cache: new InMemoryCache(),
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
