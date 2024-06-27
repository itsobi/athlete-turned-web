import { Skeleton } from './ui/skeleton';

export default function ChatRowSkeleton({
  numberOfChatRooms,
}: {
  numberOfChatRooms: number;
}) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: numberOfChatRooms }).map((_, index) => (
        <div key={index} className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-1">
            <Skeleton className="h-12 w-12 rounded-full bg-green-400/20" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-[50px] lg:w-[250px] bg-green-400/20" />
              <Skeleton className="h-4 w-[250px] lg:w-[500px] bg-green-400/20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
