'use client';

import { SendHorizonal } from 'lucide-react';
import { FormEvent, useRef } from 'react';
import { useToast } from './ui/use-toast';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { messagesConverter } from '@/lib/converters/messages';

export default function ChatInput({ chatRoomId }: { chatRoomId: string }) {
  const { toast } = useToast();
  const { user } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const message = inputRef.current?.value.trim();

    if (!message) {
      toast({
        variant: 'destructive',
        title: 'Empty message',
        description: 'You cannot send an empty message',
      });
      return;
    }

    if (message.length > 150) {
      toast({
        variant: 'destructive',
        title: 'Message limit',
        description: 'You cannot send a message longer than 150 characters',
      });
      return;
    }

    const messagesRef = collection(
      db,
      'chatRooms',
      chatRoomId,
      'messages'
    ).withConverter(messagesConverter);

    await addDoc(messagesRef, {
      chat_room_id: chatRoomId,
      created_at: serverTimestamp(),
      message: message,
      sender_user_id: user.id,
      sender_full_name: user.fullName || user.emailAddresses[0].emailAddress,
      sender_image: user.hasImage ? user.imageUrl : '',
    })
      .then(() => {
        inputRef.current!.value = '';
      })
      .catch((error: any) => {
        console.error('Error adding document', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An error occurred while sending the message',
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center rounded bg-slate-100 mb-2">
        <input
          type="text"
          className="w-full p-2 px-4 outline-none bg-transparent"
          placeholder="Type a message..."
          name="message"
          ref={inputRef}
        />
        <button
          type="submit"
          className="flex justify-center transition-none duration-150 hover:bg-green-400/20 p-2 rounded-full cursor-pointer disabled:cursor-not-allowed"
        >
          <SendHorizonal />
        </button>
      </div>
    </form>
  );
}
