import { ChatRoom } from '@/lib/converters/chatRooms';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useIsMentorStore } from '@/store/store';
import { useRouter } from 'next/navigation';

export default function ChatRow({ chatRoom }: { chatRoom: ChatRoom }) {
  // check if isMentor is true. If it is, show the user's name and image
  // if it is false, show the mentor's name and image
  const isMentor = useIsMentorStore((state) => state.isMentor);

  const router = useRouter();

  return (
    <div
      className="flex items-center justify-between p-4 hover:bg-gray-100 cursor-pointer rounded-md"
      onClick={() => router.push(`/chat/${chatRoom.chat_room_id}`)}
    >
      <div className="flex items-center space-x-1">
        <Avatar>
          <AvatarImage
            src={isMentor ? chatRoom.user_image : chatRoom.mentor_image}
          />
          <AvatarFallback>
            {isMentor
              ? chatRoom.user_full_name[0]
              : chatRoom.mentor_full_name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">
            {isMentor ? chatRoom.user_full_name : chatRoom.mentor_full_name}
          </p>
          <p className="font-light text-sm truncate">
            Part of the text string will go here...
          </p>
        </div>
      </div>
    </div>
  );
}
