'use client';

import { useIsMentorStore } from '@/store/store';
import ChatRows from './ChatRows';
import { Button } from './ui/button';

export default function RightWidget() {
  const isMentor = useIsMentorStore((state) => state.isMentor);
  return (
    <section className={`hidden lg:inline-grid lg:col-span-2 mt-4`}>
      <div className="flex flex-col space-y-10 p-4 xl:p-0">
        {!isMentor && (
          <div className="border rounded p-4">
            <div className="flex-col space-y-4">
              <h2 className="text-center text:lg xl:text-xl xl:font-semibold">
                Interested in becoming a mentor?
              </h2>
              <Button className="w-full rounded-full hover:bg-green-400">
                Apply
              </Button>
            </div>
          </div>
        )}

        {/* ChatRows */}
        <ChatRows />
      </div>
    </section>
  );
}
