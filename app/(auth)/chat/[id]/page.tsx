import ChatRoom from '@/components/ChatRoom';
import { adminDB } from '@/firebaseAdmin';
import { redirect } from 'next/navigation';

export default async function ChatRoomPage({
  params,
}: {
  params: { id: string };
}) {
  const chatRoomsCollection = await adminDB.collection('chatRooms').get();

  const hasAccess = chatRoomsCollection.docs.some(
    (doc) => doc.id === params.id
  );

  if (!hasAccess) {
    redirect('/chat/error');
  }

  return (
    <main className="main-container">
      <ChatRoom chatRoomId={params.id} />
    </main>
  );
}
