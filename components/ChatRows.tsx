'use client';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { chatRoomConverter } from '@/lib/converters/chatRooms';
import { collection } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';
import LoadingContainer from './LoadingContainer';

export default function ChatRows() {
  const [chatRooms, loading, error] = useCollectionData(
    collection(db, 'chatRooms').withConverter(chatRoomConverter)
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <LoadingContainer text="Hold tight, grabbing your chats..." />;
  } else {
    return chatRooms?.map((chatRoom) => (
      <ChatRow key={chatRoom.chatRoomId} chatRoom={chatRoom} />
    ));
  }
}
