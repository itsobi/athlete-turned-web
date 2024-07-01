'use server';

import { adminDB } from '@/firebaseAdmin';
import { auth, currentUser } from '@clerk/nextjs/server';
import * as admin from 'firebase-admin';

export const sendPost = async (post: string, isMentor: boolean) => {
  auth().protect();
  const { userId } = auth();
  const user = await currentUser();

  if (!userId) throw new Error('User is not authorized');

  if (!post) throw new Error('Post cannot be empty');

  if (post.length > 200)
    throw new Error('Post cannot be more than 200 characters');

  const postRef = adminDB.collection('posts').doc();
  const postId = postRef.id;

  try {
    await postRef.set({
      post_id: postId,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      post: post,
      user_id: userId,
      user_full_name: user?.fullName || user?.emailAddresses[0].emailAddress,
      user_image: user?.hasImage ? user.imageUrl : '',
      is_mentor: isMentor || false,
    });
    return { success: 'Post created successfully' };
  } catch (error) {
    console.error(error);
    return {
      error: 'There was an error creating this post. Please try again.',
    };
  }
};
