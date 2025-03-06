import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Presantation from './screens/Presantation';
import Home from './screens/Home';
import LevelQuestions from './screens/LevelQuestions';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Presantation">
        <Stack.Screen name="Presantation" component={Presantation}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Level" component={LevelQuestions}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

