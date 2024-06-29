import ChatRows from '@/components/ChatRows';
import PageHeader from '@/components/PageHeader';
import { db } from '@/firebase';
import { adminDB } from '@/firebaseAdmin';
import { collection, getDocs } from 'firebase/firestore';

export default async function Chats() {
  let chatRooms: number = 0;

  // const querySnapshot = await getDocs(collection(db, 'chatRooms'));
  const querySnapshot = await adminDB.collection('chatRooms').get();
  chatRooms = querySnapshot.size;

  return (
    <main className="main-container">
      <PageHeader title="Chats" />
      <ChatRows numberOfChatRooms={chatRooms} />
    </main>
  );
}
