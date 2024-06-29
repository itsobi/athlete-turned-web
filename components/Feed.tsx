'use client';

import { db } from '@/firebase';
import { postsConverter } from '@/lib/converters/posts';
import { collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import LoadingSpinner from './LoadingSpinner';
import Post from './Post';
import { useIsMentorStore } from '@/store/store';

export default function Feed() {
  const [posts, loading, error] = useCollectionData(
    collection(db, 'posts').withConverter(postsConverter)
  );
  const isMentor = useIsMentorStore((state) => state.isMentor);

  if (loading) return <LoadingSpinner />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    posts && (
      <>
        {posts.map((post) => (
          <Post key={post.unique_id} post={post} />
        ))}
      </>
    )
  );
}
