'use client';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { chatRoomsConverter } from '@/lib/converters/chatRooms';
import { collection } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';
import ChatRowSkeleton from './ChatRowSkeleton';
import { MessageCircle } from 'lucide-react';

export default function ChatRows({
  numberOfChatRooms,
}: {
  numberOfChatRooms: number;
}) {
  const [chatRooms, loading, error] = useCollectionData(
    collection(db, 'chatRooms').withConverter(chatRoomsConverter)
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (chatRooms?.length === 0) {
    return (
      <div className="flex flex-col items-center space-y-4 bg-green-400 text-center text-white p-20 rounded">
        <MessageCircle />
        <div>
          <h2 className="font-semibold">No current chats.</h2>
        </div>
      </div>
    );
  } else if (loading && numberOfChatRooms) {
    return <ChatRowSkeleton numberOfChatRooms={numberOfChatRooms} />;
  } else {
    return chatRooms?.map((chatRoom) => (
      <ChatRow key={chatRoom.chat_room_id} chatRoom={chatRoom} />
    ));
  }
}
