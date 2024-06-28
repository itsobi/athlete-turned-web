'use server';

import { db } from '@/firebase';
import { auth, currentUser } from '@clerk/nextjs/server';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

type Values = {
  post: string;
};

export const sendPost = async (values: Values) => {
  auth().protect();
  const { userId } = auth();
  const user = await currentUser();
  const post = values.post.trim();

  if (!userId) throw new Error('User is not authorized');

  if (!post) throw new Error('Post cannot be empty');

  if (post.length > 200)
    throw new Error('Post cannot be more than 200 characters');

  try {
    await addDoc(collection(db, 'posts'), {
      unique_id: uuidv4(),
      created_at: serverTimestamp(),
      post: post,
      user_id: userId,
      user_full_name: user?.fullName || user?.emailAddresses[0].emailAddress,
      user_image: user?.hasImage ? user.imageUrl : '',
    });
    return { success: 'Post created successfully' };
  } catch (error) {
    console.error(error);
    return {
      error: 'There was an error creating this post. Please try again.',
    };
  }
};
