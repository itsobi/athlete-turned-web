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
          <div
            key={message.unique_id}
            className={cn('flex items-end mb-4', {
              'justify-end': isSender,
              'justify-start': !isSender,
            })}
          >
            {!isSender && (
              <Avatar className="mr-2">
                <AvatarImage src={message.sender_image} />
                <AvatarFallback className="bg-green-400 text-white">
                  {message.sender_full_name[0]}
                </AvatarFallback>
              </Avatar>
            )}

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
                {message.sender_full_name}
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

            {isSender && (
              <Avatar className="ml-2">
                <AvatarImage src={message.sender_image} />
                <AvatarFallback>{message.sender_full_name[0]}</AvatarFallback>
              </Avatar>
            )}
          </div>
        );
      })}
    </>
  );
}
