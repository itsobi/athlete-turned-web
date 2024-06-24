import { Skeleton } from './ui/skeleton';

export default function ChatRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-[50px] lg:w-[250px]" />
          <Skeleton className="h-4 w-[250px] lg:w-[500px]" />
        </div>
      </div>
      <Skeleton className="h-4 w-[50px]" />
    </div>
  );
}
