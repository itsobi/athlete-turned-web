export default function ChatPage({ params }: { params: { id: string } }) {
  return <main className="main-container">ChatRoom - {params.id}</main>;
}
