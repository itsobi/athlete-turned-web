'use client';

import { auth, db } from '@/firebase';
import {
  useFullNameStore,
  useIntegrateWithClerkUserStore,
  useIsMentorStore,
  useNumberOfChatsStore,
} from '@/store/store';
import { useUser } from '@clerk/nextjs';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { signInWithCustomToken } from 'firebase/auth';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const { getToken } = useAuth();
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
  const setIntegratedUser = useIntegrateWithClerkUserStore(
    (state) => state.setIntegratedUser
  );

  const integrateWithClerk = async () => {
    const token = await getToken({ template: 'integration_firebase' });

    try {
      await signInWithCustomToken(auth, token || '');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) return;

    integrateWithClerk();
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
  }, [user, setNumberOfChats, setIntegratedUser]);

  return <>{children}</>;
}
