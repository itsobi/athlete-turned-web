import PageHeader from '@/components/PageHeader';
import { SignOutButton } from '@clerk/nextjs';

export default function MessagesPage() {
  return (
    <main className="main-container">
      <PageHeader title="Messages" />
      <SignOutButton />
    </main>
  );
}
