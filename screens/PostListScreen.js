import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, Modal, StyleSheet } from 'react-native';
import { createPost, getPosts } from '../services/postService';
import { auth } from '../firebase';

export default function PostListScreen() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const loadPosts = async () => {
    const postsData = await getPosts();
    setPosts(postsData);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreatePost = async () => {
    const userId = auth.currentUser.uid;

    if (newPostContent.trim()) {
      await createPost(newPostContent, userId);
      setNewPostContent('');
      setModalVisible(false);
      loadPosts();
    } else {
      alert("Le contenu du post ne peut pas être vide.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postUser}>{item.userId}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
        )}
      />
      <Button title="Créer un nouveau post" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Créer un Post</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre contenu ici"
              value={newPostContent}
              onChangeText={setNewPostContent}
            />
            <Button title="Publier" onPress={handleCreatePost} />
            <Button title="Annuler" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  post: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginVertical: 5,
    borderRadius: 5,
  },
  postUser: {
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 8,
  },
});
