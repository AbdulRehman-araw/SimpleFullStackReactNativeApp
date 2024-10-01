import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from '../screens/NotificationScreen';
import PhotoScreen from '../screens/PhotoScreen';
import TextScreen from '../screens/TextScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import Icon from 'react-native-vector-icons/Ionicons'; // Choose your preferred icon set


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen 
          name="Notifications" 
          component={NotificationScreen} 
          options={{
            tabBarActiveTintColor:'#1E1E1E',
            tabBarIcon: ({ color, size }) => (
              <Icon name="notifications-outline" size={size} color={color} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Photos" 
          component={PhotoScreen} 
          options={{
            tabBarActiveTintColor:'#1E1E1E',
            tabBarIcon: ({ color, size }) => (
              <Icon name="camera-outline" size={size} color={color} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Text" 
          component={TextScreen} 
          options={{
            tabBarActiveTintColor:'#1E1E1E',
            tabBarIcon: ({ color, size }) => (
              <Icon name="document-text-outline" size={size} color={color} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Calculator" 
          component={CalculatorScreen} 
          options={{
            tabBarActiveTintColor:'#1E1E1E',
            tabBarIcon: ({ color, size }) => (
              <Icon name="calculator-outline" size={size} color={color} />
            ),
          }} 
        />
      </Tab.Navigator>
  );
}