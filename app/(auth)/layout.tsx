import RightWidget from '@/components/RIghtWidget';
import Sidebar from '@/components/Sidebar';
import StoreProvider from '@/components/StoreProvider';
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AthleteTurned',
  description: 'Of the Athlete, by an Athlete, for the Athlete',
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-h-screen overflow-hidden lg:max-w-7xl mx-auto grid grid-cols-9 bg-gray-100/50">
        <StoreProvider>
          <Sidebar />
          {children}
          <RightWidget />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
