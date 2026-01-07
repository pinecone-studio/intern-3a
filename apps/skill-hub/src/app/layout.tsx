import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '../../../../libs/shared/shadcn/src/components/ui/sonner';
import { Footer, Header } from './_components';
import './global.css';

export const metadata = {
  title: 'Find Clubs Near You | Growly',
  description: 'Find Clubs Near You',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="">
          <Header />

          <div className="max-w-\[1440px]\ m-auto">{children}</div>
          <Toaster position="top-center" />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
