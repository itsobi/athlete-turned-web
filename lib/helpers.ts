export const getChatRoomId = (userId1: string, userId2: string) => {
  const sortedIds = [userId1, userId2].sort();
  const chatRoomId = sortedIds.join('-');

  return chatRoomId;
};
