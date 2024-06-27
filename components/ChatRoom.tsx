'use client';

import PageHeader from './PageHeader';
import ChatInput from './ChatInput';
import { messagesConverter } from '@/lib/converters/messages';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { LoaderCircle, MessageCircle } from 'lucide-react';
import ChatMessages from './ChatMessages';
import { Message } from '@/lib/converters/messages';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function ChatRoom({ chatRoomId }: { chatRoomId: string }) {
  const { user } = useUser();
  const messagesRef = collection(
    db,
    'chatRooms',
    chatRoomId,
    'messages'
  ).withConverter(messagesConverter);
  const [fullName, setFullName] = useState('');

  const messagesQuery = query(messagesRef, orderBy('created_at', 'asc'));

  const [messages, loading, error] = useCollectionData<Message>(messagesQuery);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getNameOfRecipient = () => {
    if (!user) return;

    const messageWithFullName = messages?.find(
      (message) => message.sender_user_id !== user.id
    );

    setFullName(messageWithFullName?.sender_full_name || 'Chat Room');
  };

  useEffect(() => {
    getNameOfRecipient();
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messagesEndRef]);

  if (error) {
    return (
      <div className="main-container text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <PageHeader title={fullName} />
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
      <div ref={messagesEndRef} />
    </div>
  );
}
