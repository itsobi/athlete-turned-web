import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default function Home() {
  const { userId } = auth();

  if (userId) redirect('/home');
  return (
    <main className="h-screen bg-gradient-to-r from-black to-green-400 pt-10">
      <div className="">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-6xl font-extrabold pt-10 text-white/90">
            Athlete Turned
          </h1>
          <p className="text-xl text-white/45">
            Of the Athlete, by an Athlete, for the Athlete...
          </p>
          <div className="flex items-center space-x-2 mt-10">
            {/* TODO: Change to production URL */}
            <SignInButton mode="modal">
              <Button
                variant="default"
                size="lg"
                className="rounded-full font-bold hover:bg-white hover:text-black"
              >
                Get Started
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>
    </main>
  );
}
