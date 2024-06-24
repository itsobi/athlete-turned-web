import ChatRoom from '@/components/ChatRoom';
import PageHeader from '@/components/PageHeader';
import { db } from '@/firebase';
import { chatRoomConverter } from '@/lib/converters/chatRooms';
import { collection, getDocs } from 'firebase/firestore';
import { redirect } from 'next/navigation';

export default async function ChatRoomPage({
  params,
}: {
  params: { id: string };
}) {
  const chatRoomsCollectionRef = collection(db, 'chatRooms').withConverter(
    chatRoomConverter
  );
  const hasAccess = (await getDocs(chatRoomsCollectionRef)).docs.some(
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
