import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigation from './TabNavigation';
import LoginScreen from '../screens/LoginScreen';
const Stack = createNativeStackNavigator();

const Stacknavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
       <Stack.Screen name="Splash" component={SplashScreen} />
       <Stack.Screen name="SignUp" component={SignUpScreen} />
       <Stack.Screen name="Login" component={LoginScreen} />
       <Stack.Screen name="tab" component={TabNavigation} />
      </Stack.Navigator>
  )
}

export default Stacknavigation