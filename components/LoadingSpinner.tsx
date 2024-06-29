import { LoaderCircle } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center pt-8">
      <LoaderCircle size={36} color="#4ade80" className="animate-spin" />
    </div>
  );
}
