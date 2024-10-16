import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, increment, doc } from 'firebase/firestore';

export const createPost = async (content, userId) => {
  await addDoc(collection(db, 'posts'), {
    content,
    userId,
    createdAt: new Date(),
    upvotes: 0,
  });
};

export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addUpvote = async (postId) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    upvotes: increment(1),
  });
};
