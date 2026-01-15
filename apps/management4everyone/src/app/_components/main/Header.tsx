import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 flex justify-between items-center w-full bg-white border-b border-[#E4E4E7] px-6 py-3 shadow-sm h-14">
      <Link href="/">
        <h1 className="text-xl font-semibold">Quiz App</h1>
      </Link>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};
