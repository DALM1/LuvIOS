import { db } from '../firebase';
import { collection, addDoc, doc, setDoc, query, getDocs } from 'firebase/firestore';

export const startPrivateConversation = async (userId1, userId2) => {
  const conversationId = `${userId1}_${userId2}`;
  await setDoc(doc(db, 'conversations', conversationId), {
    users: [userId1, userId2],
    createdAt: new Date(),
  });
  return conversationId;
};

export const sendPrivateMessage = async (conversationId, message, userId) => {
  const conversationRef = doc(db, 'conversations', conversationId);
  await addDoc(collection(conversationRef, 'messages'), {
    text: message,
    userId: userId,
    createdAt: new Date(),
  });
};

export const getPrivateMessages = async (conversationId) => {
  const conversationRef = doc(db, 'conversations', conversationId);
  const q = query(collection(conversationRef, 'messages'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};
