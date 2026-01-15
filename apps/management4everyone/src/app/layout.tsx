import { ClerkProvider } from '@clerk/nextjs';

import type { Metadata } from 'next';

import type React from 'react';
// import './globals.css';

export const metadata: Metadata = {
  title: 'Employee Management System',
  description: 'Manage your workforce efficiently',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
