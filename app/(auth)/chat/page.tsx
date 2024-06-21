import ChatRows from '@/components/ChatRows';
import PageHeader from '@/components/PageHeader';
export default function Chats() {
  return (
    <main className="main-container">
      <PageHeader title="Chats" />
      <ChatRows />
    </main>
  );
}
