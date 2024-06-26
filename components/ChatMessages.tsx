'use client';

import { Message } from '@/lib/converters/messages';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function ChatMessages({ messages }: { messages: Message[] }) {
  const { user } = useUser();

  return (
    <>
      {messages?.map((message) => {
        const isSender = message.sender_user_id === user?.id;
        const date = new Date(message.created_at?.toDate()).toLocaleString();
        return (
          <div key={message.unique_id} className="flex items-end mb-4">
            <div
              className={cn(
                'flex flex-col space-y-2 p-4 w-fit rounded-lg',
                isSender
                  ? 'ml-auto bg-green-400 text-white'
                  : 'bg-gray-100 text-gray-800'
              )}
            >
              <p
                className={cn(
                  'text-xs italic font-extralight',
                  isSender ? 'text-right' : 'text-left'
                )}
              >
                {isSender
                  ? message.sender_full_name
                  : user?.fullName || user?.emailAddresses[0].emailAddress}
              </p>

              <p>{message.message}</p>

              <p
                className={cn(
                  'text-xs italic font-extralight',
                  isSender ? 'text-right' : 'text-left'
                )}
              >
                {date}
              </p>
            </div>

            {isSender ? (
              <Avatar className="order-1">
                <AvatarImage src={message.sender_image} />
                <AvatarFallback>{message.sender_full_name[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarImage src={user?.hasImage ? user?.imageUrl : ''} />
                <AvatarFallback>
                  {user?.fullName
                    ? user?.fullName[0]
                    : user?.emailAddresses[0].emailAddress}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        );
      })}
    </>
  );
}
