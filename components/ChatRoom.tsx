'use client';

import PageHeader from './PageHeader';
import ChatInput from './ChatInput';
import { messagesConverter } from '@/lib/converters/messages';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { LoaderCircle, MessageCircle } from 'lucide-react';
import ChatMessages from './ChatMessages';
import { Message } from '@/lib/converters/messages';

export default function ChatRoom({ chatRoomId }: { chatRoomId: string }) {
  // TODO: order messages by created_at
  const [messages, loading, error] = useCollectionData<Message>(
    collection(db, 'chatRooms', chatRoomId, 'messages').withConverter(
      messagesConverter
    )
  );

  if (error) {
    return (
      <div className="main-container text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <PageHeader title="Chat Room" />
        {loading && (
          <main className="main-container">
            <div className="flex justify-center pt-8">
              <LoaderCircle
                size={36}
                color="#4ade80"
                className="animate-spin"
              />
            </div>
          </main>
        )}
        {!loading && messages?.length === 0 && (
          <div className="flex flex-col items-center space-y-4 bg-green-400 text-center text-white p-20 rounded">
            <MessageCircle />
            <div>
              <h2 className="font-semibold">
                This is the start of something great!
              </h2>
              <h4 className="font-light">
                Send a message to get this conversation started.
              </h4>
            </div>
          </div>
        )}
        {messages?.length ? <ChatMessages messages={messages} /> : null}
      </div>

      <ChatInput chatRoomId={chatRoomId} />
    </div>
  );
}
