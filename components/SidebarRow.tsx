'use client';

import { LucideProps } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import react from 'react';

type SidebarRowProps = {
  Icon: react.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & react.RefAttributes<SVGSVGElement>
  >;
  title: string;
  href: string;
  active: boolean;
};

export default function SidebarRow({
  Icon,
  title,
  href,
  active,
}: SidebarRowProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className="flex justify-center lg:justify-start items-center space-x-0 lg:space-x-2 lg:hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-100 ease-in-out group lg:p-2"
    >
      <Icon
        className={`group-hover:text-green-400 ${active && 'text-green-400'}`}
      />
      <p
        className={`hidden lg:inline-flex group-hover:text-green-400 ${
          active && 'text-green-400'
        }`}
      >
        {title}
      </p>
    </Link>
  );
}
