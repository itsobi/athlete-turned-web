'use client';

import { Post as PostType } from '@/lib/converters/posts';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import ReactTimeAgo from 'react-timeago';
import { BadgeCheck, MessageCircle, ThumbsUp, Trash2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import {
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { useToast } from './ui/use-toast';
import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Post({ post }: { post: PostType }) {
  const { user } = useUser();
  const { toast } = useToast();
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const postRef = doc(db, 'posts', post.post_id);
  const likeRef = doc(collection(postRef, 'likes'), user?.id);

  // get number of likes for a post
  const likesQuery = collection(postRef, 'likes');
  const [likes, loadingLikes, errorLikes] = useCollectionData(likesQuery);

  useEffect(() => {
    if (!user || !post.post_id) return;

    const checkIfLiked = async () => {
      try {
        const likeDoc = await getDoc(likeRef);
        setAlreadyLiked(likeDoc.exists());
      } catch (error) {
        console.error('Error checking like status: ', error);
      }
    };

    checkIfLiked();
  }, [likes, user]);

  const handleLike = async () => {
    if (!user) return;

    try {
      await runTransaction(db, async (transaction) => {
        const likeDoc = await transaction.get(likeRef);

        if (!likeDoc.exists()) {
          transaction.set(likeRef, {
            user_id: user.id,
            created_at: serverTimestamp(),
          });
        }
      });
    } catch (error) {
      console.error('Transaction failed: ', error);
      toast({
        title: 'Error',
        description: 'There was an issue liking the post. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex space-x-2 border-t p-4 rounded">
      <Avatar>
        <AvatarImage src={post.user_image} alt="@shadcn" />
        <AvatarFallback className="bg-green-400 text-white">
          {post.user_full_name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <h4 className="font-semibold">{post.user_full_name}</h4>
          {post.is_mentor && <BadgeCheck color="#4ade80" />}
          <p className="font-light text-sm">
            <ReactTimeAgo date={post.created_at.toDate()} />
          </p>
        </div>
        <p>{post.post}</p>
        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center">
            <button
              onClick={handleLike}
              className="cursor-pointer hover:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-100"
              disabled={user?.id === post.user_id || alreadyLiked}
            >
              <ThumbsUp size={18} />
            </button>
            <p>{likes?.length}</p>
          </div>

          <button className="cursor-pointer hover:opacity-50">
            <MessageCircle size={18} />
          </button>
          {post.user_id === user?.id && (
            <button className="cursor-pointer hover:opacity-50">
              <Trash2 size={18} color="#EF4444" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
