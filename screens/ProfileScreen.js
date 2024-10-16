import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadProfilePicture } from '../services/storageService'; // Utiliser ton service pour uploader l'image
import { auth, db } from '../firebase'; // Firebase auth et Firestore
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'; // Ajout de getDoc et setDoc pour vérifier l'existence du document

export default function ProfileScreen() {
  const [avatar, setAvatar] = useState(null); // Pour stocker l'image de l'avatar
  const [username, setUsername] = useState(''); // Pour stocker le nom d'utilisateur

  // Fonction pour choisir une image depuis la galerie
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  // Fonction pour vérifier si le document utilisateur existe
  const checkIfUserExists = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.exists();
  };

  // Fonction pour mettre à jour ou créer l'avatar
  const handleUpdateAvatar = async () => {
    const userId = auth.currentUser.uid;
    const userDocRef = doc(db, 'users', userId);

    // Si l'image existe
    if (avatar) {
      const downloadURL = await uploadProfilePicture(userId, avatar); // Uploader l'image sur Firebase Storage

      // Vérifie si le document utilisateur existe
      const userExists = await checkIfUserExists(userId);

      if (userExists) {
        // Si l'utilisateur existe, on fait une mise à jour
        await updateDoc(userDocRef, { avatar: downloadURL });
      } else {
        // Si l'utilisateur n'existe pas, on le crée avec l'avatar
        await setDoc(userDocRef, { avatar: downloadURL, username: '' });
      }

      alert('Avatar mis à jour !');
    }
  };

  // Fonction pour mettre à jour le nom d'utilisateur
  const handleUpdateUsername = async () => {
    const userId = auth.currentUser.uid;
    const userDocRef = doc(db, 'users', userId);

    if (username.trim()) {
      // Vérifie si le document utilisateur existe
      const userExists = await checkIfUserExists(userId);

      if (userExists) {
        // Mise à jour du document existant
        await updateDoc(userDocRef, { username: username });
      } else {
        // Création du document avec le nom d'utilisateur si le document n'existe pas encore
        await setDoc(userDocRef, { username: username, avatar: '' });
      }

      alert('Nom d’utilisateur mis à jour !');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>
      <Image
        source={avatar ? { uri: avatar } : require('../assets/default-avatar.png')}
        style={styles.avatar}
      />
      <Button title="Choisir une photo de profil" onPress={pickImage} />
      <Button title="Mettre à jour l'avatar" onPress={handleUpdateAvatar} />

      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Mettre à jour le nom d’utilisateur" onPress={handleUpdateUsername} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});
