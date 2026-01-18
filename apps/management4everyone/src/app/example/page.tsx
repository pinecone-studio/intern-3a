'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export default function ExamplePage() {
  const { loading, error, data } = useQuery(gql`
    query {
      hello
    }
  `);
  if (loading) return <p>Loading ...</p>;

  console.log('loading, error, data', loading, error, data);
  return <div>Example</div>;
}
