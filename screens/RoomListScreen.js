import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getRooms, createRoom } from '../services/roomService';

export default function RoomListScreen({ navigation }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const roomsData = await getRooms();
    setRooms(roomsData);
  };

  const handleCreateRoom = async () => {
    await createRoom('Nouvelle Room');
    loadRooms();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Rooms</Text>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Room', { roomId: item.id })}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Créer une nouvelle Room" onPress={handleCreateRoom} />
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
});
