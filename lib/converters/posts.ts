import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';

export type Post = {
  post_id: string;
  created_at: Timestamp;
  post: string;
  user_id: string;
  user_full_name: string;
  is_mentor: boolean;
  user_image?: string;
};

export const postsConverter: FirestoreDataConverter<Post> = {
  toFirestore(post: Post): DocumentData {
    return {
      post_id: post.post_id,
      created_at: post.created_at,
      post: post.post,
      user_id: post.user_id,
      user_full_name: post.user_full_name,
      is_mentor: post.is_mentor,
      user_image: post.user_image,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Post {
    const data = snapshot.data(options);
    return {
      post_id: data.post_id,
      created_at: data.created_at,
      post: data.post,
      user_id: data.user_id,
      user_full_name: data.user_full_name,
      is_mentor: data.is_mentor,
      user_image: data.user_image,
    };
  },
};
