'use client';

import { db } from '@/firebase';
import { postsConverter } from '@/lib/converters/posts';
import { collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Feed() {
  // const [posts, loading, error] = useCollectionData(
  //   collection(db, 'posts').withConverter(postsConverter)
  // );

  return <div>Feed</div>;
}
