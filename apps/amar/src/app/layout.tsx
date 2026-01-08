import './global.css';

import { AppProvider } from '../context/app-context';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
