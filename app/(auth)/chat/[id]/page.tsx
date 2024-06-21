import PageHeader from '@/components/PageHeader';

export default function ChatRoom({ params }: { params: { id: string } }) {
  return (
    <main className="main-container">
      <PageHeader title="Chat Room" />
    </main>
  );
}
