'use client';
import React, { use } from 'react';

interface RegistrationPageProps {
  searchParams: Promise<{
    clubId?: string | undefined;
    level?: string | undefined;
  }>;
}

const page = ({ searchParams }: RegistrationPageProps) => {
  const { clubId, level } = use(searchParams);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>Registration Page</h1>
      <p>
        CLUB ID: <span className="font-mono">{clubId}</span>
      </p>
      <p>
        LEVEL: <span className="font-mono">{level}</span>
      </p>
    </div>
  );
};

export default page;
