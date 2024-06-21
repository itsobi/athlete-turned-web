'use client';

import { useToast } from '@/components/ui/use-toast';
import { useNumberOfChatsStore } from '@/store/store';
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
import { Mentor, UserObj } from '@/app/(auth)/mentors/page';

export const useChatRoom = (mentor: Mentor, user: UserObj) => {
  const router = useRouter();
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

    const chatRoomId = getChatRoomId(mentor.id, user.id);
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
          chat_room_id: chatRoomId,
          created_at: serverTimestamp(),
          mentor_full_name:
            mentor.firstName && mentor.lastName
              ? `${mentor.firstName} ${mentor.lastName}`
              : mentor.email,
          mentor_image: mentor.image,
          user_full_name:
            user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.email,
          user_image:
            user.image ||
            'https://psbu-smc-registry-stg.cummins.com/sites/smc/themes/custom/cummins_smc/images/profile.png',
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
      }
    } catch (error: any) {
      console.error('Chat room error', error);
      toast({
        title: 'Error!',
        description: error.message,
        variant: 'destructive',
      });
    }

    router.push(`/chat/${mentor.id}`);
  };

  return { goToChatRoom };
};
