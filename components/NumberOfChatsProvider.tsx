'use client';

import { db } from '@/firebase';
import { useNumberOfChatsStore } from '@/store/store';
import { useUser } from '@clerk/nextjs';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

export default function NumberOfChatsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const setNumberOfChats = useNumberOfChatsStore(
    (state) => state.setNumberOfChats
  );

  useEffect(() => {
    if (!user) return;

    return onSnapshot(
      doc(db, 'numberOfChats', user.id),
      (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.data().count);
          // Store data in store
          setNumberOfChats(snapshot.data().count);
        } else {
          // Set data in store to 0
          setNumberOfChats(0);
        }
      },
      (error) => {
        console.error('Error getting number of chats', error);
      }
    );
  }, [user, setNumberOfChats]);

  return <>{children}</>;
}
