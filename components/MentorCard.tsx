'use client';

import { Mentor, UserObj } from '@/app/(auth)/mentors/page';
import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';
import { useChatRoom } from '@/lib/hooks/useChatRoom';
import { useNumberOfChatsStore } from '@/store/store';
import { cn } from '@/lib/utils';

export default function MentorCard({
  mentor,
  user,
}: {
  mentor: Mentor;
  user: UserObj;
}) {
  const { goToChatRoom } = useChatRoom(mentor, user);
  const chatCount = useNumberOfChatsStore((state) => state.count);

  return (
    <div key={mentor.id} className={`p-4 bg-white shadow rounded-lg`}>
      <img
        src={mentor.image}
        alt="Mentor avatar"
        className="w-10 h-10 rounded-full"
      />

      <div className="flex space-x-4 items-center justify-between mb-4">
        <h4 className="font-semibold">
          {mentor.firstName} {mentor.lastName}
        </h4>
        <p>{mentor.company.title}</p>
      </div>

      <p className="font-extralight">{mentor.bio}</p>

      <Button
        onClick={goToChatRoom}
        className={cn(
          'w-full mt-4 hover:bg-green-400 rounded-full',
          chatCount === 3 && 'cursor-not-allowed'
        )}
        disabled={chatCount === 3}
      >
        <MessageCircle className="mr-2" />
        Message
      </Button>
    </div>
  );
}
