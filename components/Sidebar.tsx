'use client';

import { usePathname } from 'next/navigation';
import SidebarRow from './SidebarRow';
import { ClipboardPen, Home, MessageCircle, Users } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { useFullNameStore, useIsMentorStore } from '@/store/store';

export default function Sidebar() {
  const pathname = usePathname();

  const active = (href: string) => pathname.includes(href);

  const isMentor = useIsMentorStore((state) => state.isMentor);
  const fullName = useFullNameStore((state) => state.fullName);

  return (
    <section className="col-span-1 lg:col-span-2 p-4 flex flex-col items-center lg:items-start">
      <div className="hidden lg:inline-flex flex-col mb-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-400">
            <span className="text-green-400">Athlete</span>Turned
          </h1>
          <p className="text-xs font-semibold">
            Of the <span className="text-green-400">Athlete</span>, by an{' '}
            <span className="text-green-400">Athlete</span>, for the{' '}
            <span className="text-green-400">Athlete</span>
          </p>
        </div>
        <p className="text-xs mt-2 text-black/25">
          Brought to you by:{' '}
          <a
            href="https://justobii.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:underline"
          >
            justobii.com
          </a>
        </p>
      </div>
      <div className="space-y-4 mt-6 lg:mt-0 lg:space-y-2 lg:w-full">
        <SidebarRow
          Icon={Home}
          title="Home"
          href="/home"
          active={active('/home')}
        />
        {!isMentor && (
          <SidebarRow
            Icon={Users}
            title="Mentors"
            href="/mentors"
            active={active('/mentors')}
          />
        )}
        <SidebarRow
          Icon={MessageCircle}
          title="Chat"
          href="/chat"
          active={active('/chat')}
        />
        {!isMentor && (
          <SidebarRow
            Icon={ClipboardPen}
            title="Apply"
            href="/apply"
            active={active('/apply')}
          />
        )}
      </div>
      <div className="mt-8 flex space-x-2">
        <UserButton />
        <p className="hidden lg:inline-flex font-semibold">{fullName}</p>
      </div>
    </section>
  );
}
