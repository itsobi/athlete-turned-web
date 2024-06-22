'use client';

import { db } from '@/firebase';
import {
  useFullNameStore,
  useIsMentorStore,
  useNumberOfChatsStore,
} from '@/store/store';
import { useUser } from '@clerk/nextjs';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const IS_MENTOR = user?.publicMetadata?.isMentor as boolean;
  const FULL_NAME =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.emailAddresses?.[0]?.emailAddress;
  const setNumberOfChats = useNumberOfChatsStore(
    (state) => state.setNumberOfChats
  );
  const setIsMentor = useIsMentorStore((state) => state.setIsMentor);
  const setFullName = useFullNameStore((state) => state.setFullName);

  useEffect(() => {
    if (!user) return;

    setIsMentor(IS_MENTOR);
    setFullName(FULL_NAME as string);
    return onSnapshot(
      doc(db, 'numberOfChats', user.id),
      (snapshot) => {
        if (snapshot.exists()) {
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
