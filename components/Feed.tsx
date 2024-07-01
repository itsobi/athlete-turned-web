'use client';

import { db } from '@/firebase';
import { postsConverter } from '@/lib/converters/posts';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import LoadingSpinner from './LoadingSpinner';
import Post from './Post';

export default function Feed() {
  const [posts, loading, error] = useCollectionData(
    query(
      collection(db, 'posts').withConverter(postsConverter),
      orderBy('created_at', 'desc') // Sort by createdAt in descending order
    )
  );

  if (loading) return <LoadingSpinner />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    posts && (
      <>
        {posts.map((post) => (
          <Post key={post.post_id} post={post} />
        ))}
      </>
    )
  );
}
