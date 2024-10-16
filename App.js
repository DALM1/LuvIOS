import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import RoomListScreen from './screens/RoomListScreen';
import RoomScreen from './screens/RoomScreen';
import PrivateMessageScreen from './screens/PrivateMessageScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostListScreen from './screens/PostListScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerLeft: null, title: 'Inscription' }}
      />
      <Stack.Screen
        name="Rooms"
        component={RoomListScreen}
        options={{ headerLeft: null, title: 'Liste des Rooms' }}
      />
      <Stack.Screen
        name="Room"
        component={RoomScreen}
        options={{ headerLeft: null, title: 'Messages dans la Room' }}
      />
      <Stack.Screen
        name="PrivateMessage"
        component={PrivateMessageScreen}
        options={{ headerLeft: null, title: 'Messages Privés' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerLeft: null, title: 'Mon Profil' }}
      />
      <Stack.Screen
        name="Posts"
        component={PostListScreen}
        options={{ headerLeft: null, title: 'Posts' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={MainStackNavigator}
          options={{ drawerLabel: 'Accueil' }}
        />
        <Drawer.Screen
          name="Threads"
          component={RoomListScreen}
          options={{ drawerLabel: 'Threads' }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ drawerLabel: 'Profil' }}
        />
        <Drawer.Screen
          name="Posts"
          component={PostListScreen}
          options={{ drawerLabel: 'Posts' }}
        />
        <Drawer.Screen
          name="Messages Privés"
          component={PrivateMessageScreen}
          options={{ drawerLabel: 'Messages Privés' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
