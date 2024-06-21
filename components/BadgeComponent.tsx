'use client';

import { cn } from '@/lib/utils';
import { useNumberOfChatsStore } from '@/store/store';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function BadgeComponent() {
  const chatCount = useNumberOfChatsStore((state) => state.count);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'flex rounded-full bg-green-400 px-2 text-white transition-all ease-in-out hover:animate-pulse',
              chatCount === 2 && 'bg-yellow-400',
              chatCount === 3 && 'bg-red-500'
            )}
          >
            {chatCount}
          </div>
        </TooltipTrigger>
        <TooltipContent className="border-none">
          <p className="text-xl text-center">
            You have {3 - chatCount} chat(s) left
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
