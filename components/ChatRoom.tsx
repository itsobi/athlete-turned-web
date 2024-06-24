import { SendHorizonal } from 'lucide-react';
import PageHeader from './PageHeader';

export default function ChatRoom({ chatRoomId }: { chatRoomId: string }) {
  return (
    <div className="h-full flex flex-col">
      <PageHeader title="Chat Room" />
      <div className="flex-1">chat messages</div>
      <div className="flex items-center rounded bg-slate-100 mb-2">
        <input
          type="text"
          className="w-full p-2 px-4 outline-none bg-transparent"
          placeholder="Type a message..."
        />
        <SendHorizonal className="mr-2" />
      </div>
    </div>
  );
}
