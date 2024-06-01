import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex justify-center items-center mt-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-6xl font-extrabold">Athlete Turned</h1>
        <p className="text-xl text-slate-800">
          Of the Athlete, by an Athlete, for the Athletes
        </p>
        <div className="flex items-center space-x-2 mt-10">
          <Link
            href="/register"
            className={`rounded-full ${buttonVariants({
              variant: 'default',
              size: 'lg',
            })}`}
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
