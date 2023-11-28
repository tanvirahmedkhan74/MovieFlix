import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieList from '../screens/MovieList';
import MovieByYearScreen from '../screens/MovieByYearScreen';
import MovieScreen from '../screens/MovieScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' options={{headerShown: false}} component={HomeScreen}/>
            <Stack.Screen name='MovieList' options={{headerShown:false}} component={MovieList}/>
            <Stack.Screen name='MovieByYear' options={{headerShown: false}} component={MovieByYearScreen}/>
            <Stack.Screen name='Movie' options={{headerShown: false}} component={MovieScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}