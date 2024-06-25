'use client';

import PageHeader from './PageHeader';
import ChatInput from './ChatInput';
import { useUser } from '@clerk/nextjs';
import { useToast } from './ui/use-toast';

export default function ChatRoom({ chatRoomId }: { chatRoomId: string }) {
  return (
    <div className="h-full flex flex-col">
      <PageHeader title="Chat Room" />
      <div className="flex-1">chat messages</div>

      <ChatInput chatRoomId={chatRoomId} />
    </div>
  );
}
