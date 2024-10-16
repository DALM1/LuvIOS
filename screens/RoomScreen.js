import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getMessagesFromRoom, sendMessageToRoom } from '../services/roomService';
import { auth } from '../firebase';

export default function RoomScreen({ route }) {
  const { roomId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const loadMessages = async () => {
    const messagesData = await getMessagesFromRoom(roomId);
    setMessages(messagesData);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const userId = auth.currentUser.uid;
      await sendMessageToRoom(roomId, newMessage, userId);
      setNewMessage('');
      loadMessages();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages dans la Room</Text>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text style={styles.messageUser}>{item.userId}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        placeholder="Tapez votre message"
        value={newMessage}
        onChangeText={setNewMessage}
        style={styles.input}
      />
      <Button title="Envoyer" onPress={handleSendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginVertical: 5,
    borderRadius: 5,
  },
  messageUser: {
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});
