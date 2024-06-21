import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export type ChatRoom = {
  chat_room_id: string;
  created_at: string | null;
  mentor_full_name: string;
  mentor_image: string;
  user_full_name: string;
  user_image: string;
};

export const chatRoomConverter: FirestoreDataConverter<ChatRoom> = {
  toFirestore(chatRoom: ChatRoom): DocumentData {
    return {
      chat_room_id: chatRoom.chat_room_id,
      created_at: chatRoom.created_at,
      mentor_full_name: chatRoom.mentor_full_name,
      mentor_image: chatRoom.mentor_image,
      user_full_name: chatRoom.user_full_name,
      user_image: chatRoom.user_image,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ChatRoom {
    const data = snapshot.data(options);
    return {
      chat_room_id: data.chat_room_id,
      created_at: data.created_at,
      mentor_full_name: data.mentor_full_name,
      mentor_image: data.mentor_image,
      user_full_name: data.user_full_name,
      user_image: data.user_image,
    };
  },
};
