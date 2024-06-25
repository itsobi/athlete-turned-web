import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export type Message = {
  chat_room_id: string;
  created_at: string;
  message: string;
  sender_user_id: string;
  sender_full_name: string;
  sender_image: string;
};

export const messagesConverter: FirestoreDataConverter<Message> = {
  toFirestore(message: Message): DocumentData {
    return {
      chat_room_id: message.chat_room_id,
      created_at: message.created_at,
      message: message.message,
      sender_user_id: message.sender_user_id,
      sender_full_name: message.sender_full_name,
      sender_image: message.sender_image,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);
    return {
      chat_room_id: data.chat_room_id,
      created_at: data.created_at,
      message: data.message,
      sender_user_id: data.sender_user_id,
      sender_full_name: data.sender_full_name,
      sender_image: data.sender_image,
    };
  },
};
