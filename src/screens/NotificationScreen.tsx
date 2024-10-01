import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

export default function NotificationScreen({navigation}:any) {

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    }
  };

  const sendNotification = async () => {
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Local Notification',
      body: 'This is a test notification!',
      android: {
        channelId,
        // Add other Android options here if needed
      },
    });

    console.log('Notification sent!');
  };

  useEffect(() => {
    requestUserPermission();
  
    // Listen for foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  
    return unsubscribe;
  }, [])
  

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      // console.log('onForegroundEvent', detail?.notification?.data);
    });
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('uid').then(() => {
        navigation.dispatch(StackActions.replace('Login'));
      })
    } catch (error) {
      console.log("🚀 ~ logout ~ error:", error)

    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={logout} style={styles.logout}>
        <Icon name={'logout'} size={20} color="#ffff" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Notification Test</Text>
        <Text style={styles.description}>
          Press the big red button below to send a test notification to your device.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={sendNotification}
          activeOpacity={0.8}
        >
          <Icon name="bell-ring" size={40} color="#FFFFFF" />
          <Text style={styles.buttonText}>Send Notification</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E53E3E',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  logout: {
    backgroundColor: '#1E1E1E',
    alignSelf: 'flex-end',
    height: 50, width: 50, borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin:20
  }
});