import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

export const createRoom = async (roomName) => {
  const roomRef = await addDoc(collection(db, 'rooms'), {
    name: roomName,
    createdAt: new Date(),
  });
  return roomRef.id;
};

export const getRooms = async () => {
  const querySnapshot = await getDocs(collection(db, 'rooms'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const sendMessageToRoom = async (roomId, message, userId) => {
  const roomRef = collection(db, `rooms/${roomId}/messages`);
  await addDoc(roomRef, {
    text: message,
    userId: userId,
    createdAt: new Date(),
  });
};

export const getMessagesFromRoom = async (roomId) => {
  const roomRef = collection(db, `rooms/${roomId}/messages`);
  const q = query(roomRef, orderBy('createdAt'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};
