'use client';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { chatRoomsConverter } from '@/lib/converters/chatRooms';
import { collection } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';
import ChatRowSkeleton from './ChatRowSkeleton';

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
  } else if (loading && numberOfChatRooms) {
    return <ChatRowSkeleton numberOfChatRooms={numberOfChatRooms} />;
  } else {
    return chatRooms?.map((chatRoom) => (
      <ChatRow key={chatRoom.chat_room_id} chatRoom={chatRoom} />
    ));
  }
}
