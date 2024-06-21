import NumberOfChatsProvider from '@/components/NumberOfChatsProvider';
import RightWidget from '@/components/RIghtWidget';
import Sidebar from '@/components/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { currentUser } from '@clerk/nextjs/server';
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
  const user = await currentUser();

  const isMentor = user?.publicMetadata?.isMentor as boolean;
  const name =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.emailAddresses?.[0]?.emailAddress;
  return (
    <html lang="en">
      <body className="max-h-screen overflow-hidden lg:max-w-7xl mx-auto grid grid-cols-9 bg-gray-100/50">
        <NumberOfChatsProvider>
          <Sidebar isMentor={isMentor} name={name} />
          {children}
          <RightWidget isMentor={isMentor} />
          <Toaster />
        </NumberOfChatsProvider>
      </body>
    </html>
  );
}
