import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ChatError() {
  return (
    <main className="main-container">
      <Alert
        variant="destructive"
        className="border-red-600 bg-red-600 text-white"
      >
        <AlertCircle className="h-4 w-4" color="white" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex items-center">
          <p className="flex-1 font-semibold">
            You do not have access to this chat.
          </p>
          <Link href="/chat" replace>
            <Button>Dismiss</Button>
          </Link>
        </AlertDescription>
      </Alert>
    </main>
  );
}
