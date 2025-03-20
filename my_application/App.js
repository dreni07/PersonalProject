import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Presantation from './screens/Presantation';
import Home from './screens/Home';
import LevelQuestions from './screens/LevelQuestions';
import SearchDetails from './screens/SearchDetails';
import Articles from './screens/Articles';
// import PracticalQuestion from './screens/PracticalQuestion';
// import PersonalizedQuestion from './screens/PersonalizedQuestion';
import PracticalQuestion from './screens/PracticalQuestion';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Presantation">
        <Stack.Screen name="Presantation" component={Presantation}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Level" component={LevelQuestions}/>
        <Stack.Screen name="SearchDetails" component={SearchDetails}/>
        <Stack.Screen name="Personalized" component={PracticalQuestion}/>
        <Stack.Screen name="Practical" component={PracticalQuestion}/>
        <Stack.Screen name="Articles" component={Articles}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

