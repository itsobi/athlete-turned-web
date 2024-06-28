import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';

export type Post = {
  unique_id: string;
  created_at: Timestamp;
  post: string;
  user_id: string;
  user_full_name: string;
  user_image?: string;
};

export const postsConverter: FirestoreDataConverter<Post> = {
  toFirestore(post: Post): DocumentData {
    return {
      unique_id: post.unique_id,
      created_at: post.created_at,
      post: post.post,
      user_id: post.user_id,
      user_full_name: post.user_full_name,
      user_image: post.user_image,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Post {
    const data = snapshot.data(options);
    return {
      unique_id: data.unique_id,
      created_at: data.created_at,
      post: data.post,
      user_id: data.user_id,
      user_full_name: data.user_full_name,
      user_image: data.user_image,
    };
  },
};
