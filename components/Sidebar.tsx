'use client';

import { usePathname } from 'next/navigation';
import SidebarRow from './SidebarRow';
import { Home, MessageCircle } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const active = (href: string) => pathname === href;

  return (
    <div className="col-span-1 lg:col-span-2 p-4 flex flex-col items-center lg:items-start">
      <div className="hidden lg:inline-flex flex-col mb-4">
        <h1 className="text-2xl font-bold text-gray-400">AthleteTurned</h1>
        <p className="text-xs font-semibold">
          Of the Athlete, by an Athlete, for the Athlete...
        </p>
        <p className="text-xs mt-2 text-black/25">
          Brought to you by:{' '}
          <a
            href="https://justobii.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            justobii.com
          </a>
        </p>
      </div>
      <div className="space-y-4 lg:space-y-2 lg:w-full">
        <SidebarRow
          Icon={Home}
          title="Home"
          href="/home"
          active={active('/home')}
        />
        <SidebarRow
          Icon={MessageCircle}
          title="Messages"
          href="/messages"
          active={active('/messages')}
        />
      </div>
    </div>
  );
}
