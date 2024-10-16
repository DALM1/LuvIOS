import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';

export default function LogoutScreen({ navigation }) {
  useEffect(() => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    }).catch(error => {
      console.log('Erreur de déconnexion :', error);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Déconnexion...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});
