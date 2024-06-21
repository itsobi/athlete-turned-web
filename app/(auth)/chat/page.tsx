'use client';

import PageHeader from '@/components/PageHeader';
import { useNumberOfChatsStore } from '@/store/store';

export default function ChatRoom() {
  const numberOfChats = useNumberOfChatsStore((state) => state.count);
  console.log('numberOfChats', numberOfChats);
  return (
    <main className="main-container">
      <PageHeader title="Chat Room" />
      <p>{numberOfChats}</p>
    </main>
  );
}
