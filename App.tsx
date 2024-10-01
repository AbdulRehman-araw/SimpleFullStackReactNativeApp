import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stacknavigation from './src/navigation/Stacknavigation';

  import firebase from '@react-native-firebase/app';
import 'firebase/auth'; // or any other service you are using
import TabNavigation from './src/navigation/TabNavigation';

export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyA9hWzR222T7pPK_9tLDJxithmxF4qSHX8",
    authDomain: "simplefullstackreactnativeapp.firebaseapp.com", // Derived from Project ID
    projectId: "simplefullstackreactnativeapp",
    storageBucket: "simplefullstackreactnativeapp.appspot.com", // Derived from Project ID
    messagingSenderId: "940072170864", // This is your Project Number
    appId: "1:940072170864:android:2a7c3a20ccf6a06a874bb5", // Keep this as is
  };

if (!firebase?.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}
  return (
    <NavigationContainer>
      <Stacknavigation />
      {/* <TabNavigation/> */}
    </NavigationContainer>
  );
}
