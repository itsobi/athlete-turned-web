'use client';

import { useToast } from '@/components/ui/use-toast';
import { useNumberOfChatsStore } from '@/store/store';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { getChatRoomId } from '../helpers';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/firebase';

// hooks/useChatRoom.ts

export const useChatRoom = (mentorId: string, userId: string) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const chatCount = useNumberOfChatsStore((state) => state.count);
  const setNumberOfChats = useNumberOfChatsStore(
    (state) => state.setNumberOfChats
  );

  const goToChatRoom = async () => {
    if (!user) return;
    if (chatCount >= 3) {
      toast({
        title: 'Sorry!',
        description: 'You have reached the maximum number of chats allowed.',
        variant: 'destructive',
      });
      return;
    }

    const chatRoomId = getChatRoomId(mentorId, userId);
    const chatRoomRef = doc(db, 'chatRooms', chatRoomId);
    const chatRoomsCollectionRef = collection(db, 'chatRooms');

    try {
      const chatRoomSnapshot = await getDoc(chatRoomRef);
      if (chatCount >= 3) {
        toast({
          title: 'Sorry!',
          description: 'You have reached the maximum number of chats allowed.',
          variant: 'destructive',
        });
        return;
      }
      if (!chatRoomSnapshot.exists()) {
        // Create the chat room since it does not exist
        await setDoc(doc(db, 'chatRooms', chatRoomId), {
          chatRoomId: chatRoomId,
          createdAt: serverTimestamp(),
        });

        const chatRoomsSnapshot = await getDocs(chatRoomsCollectionRef);
        const count = chatRoomsSnapshot.docs.length;
        setNumberOfChats(count);

        // create collection for numberOfChats
        await setDoc(doc(db, 'numberOfChats', user.id), {
          count,
        });

        toast({
          className: 'bg-green-500 text-white',
          title: 'Chat room created!',
          description: `You have created a total of ${count} chat(s). You can now start chatting with this mentor.`,
        });
      } else {
        // Chat room already exists, no need to increment the chat count
        toast({
          className: 'bg-yellow-500 text-white',
          title: 'Chat room exists!',
          description: 'You already have a chat room with this mentor.',
        });
      }
    } catch (error: any) {
      console.error('Chat room error', error);
      toast({
        title: 'Error!',
        description: error.message,
        variant: 'destructive',
      });
    }

    router.push(`/chat/${mentorId}`);
  };

  return { goToChatRoom };
};
