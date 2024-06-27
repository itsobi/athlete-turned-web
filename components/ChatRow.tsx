'use client';

import { ChatRoom } from '@/lib/converters/chatRooms';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useIsMentorStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { messagesConverter } from '@/lib/converters/messages';

export default function ChatRow({ chatRoom }: { chatRoom: ChatRoom }) {
  const isMentor = useIsMentorStore((state) => state.isMentor);
  const router = useRouter();
  const [lastMessage, setLastMessage] = useState('');

  useEffect(() => {
    const getLastMessage = async () => {
      const messagesRef = collection(
        db,
        'chatRooms',
        chatRoom.chat_room_id,
        'messages'
      ).withConverter(messagesConverter);
      const lastMessageQuery = query(
        messagesRef,
        orderBy('created_at', 'desc'),
        limit(1)
      );
      const querySnapshot = await getDocs(lastMessageQuery);

      setLastMessage(querySnapshot.docs[0]?.data().message);
    };

    getLastMessage();
  }, [chatRoom.chat_room_id]);

  return (
    <div
      className="flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer rounded-md"
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
            {lastMessage || 'No messages yet'}
          </p>
        </div>
      </div>
    </div>
  );
}
