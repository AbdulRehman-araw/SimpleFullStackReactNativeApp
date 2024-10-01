import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = ({ navigation }: { navigation: any }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const [UID, setUID] = useState('')

  const getUid = async () => {
    try {
      let res = await AsyncStorage.getItem('uid')
      if (res !== null) {
        setUID(res)
      }
    } catch (error) {
      console.log("🚀 ~ getUid ~ error:", error)

    }
  }

  useEffect(() => {
    getUid()

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (UID) {
        navigation.dispatch(StackActions.replace('tab'));
      } else {
        navigation.dispatch(StackActions.replace('Login'));
      }
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🚀</Text>
        </View>
        <Text style={styles.appName}>Full Stack React Native App</Text>
        <Text style={styles.tagline}>Your journey begins here</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logo: {
    fontSize: 60,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    marginVertical: 10
  },
  tagline: {
    fontSize: 20,
    color: '#CCCCCC',
    marginTop: 8
  },
});

export default SplashScreen;