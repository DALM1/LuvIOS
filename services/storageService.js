import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadProfilePicture = async (userId, file) => {
  const fileRef = ref(storage, `profilePictures/${userId}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};

export const uploadFileToRoom = async (roomId, file) => {
  const fileRef = ref(storage, `roomFiles/${roomId}/${file.name}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};
