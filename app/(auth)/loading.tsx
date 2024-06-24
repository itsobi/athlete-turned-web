import { LoaderCircle } from 'lucide-react';
import React from 'react';

export default function LoadingPage() {
  return (
    <main className="main-container">
      <div className="flex justify-center pt-8">
        <LoaderCircle size={36} color="#4ade80" className="animate-spin" />
      </div>
    </main>
  );
}
