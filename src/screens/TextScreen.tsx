import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

interface Message {
  id: string;
  text: string;
  timestamp: number;
}

export default function TextScreen() {
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const sendText = async () => {
    if (text.trim()) {
      await firestore().collection('messages').add({
        text: text.trim(),
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      setText('');
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((querySnapshot) => {
        const messagesData: Message[] = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({
            id: doc.id,
            text: doc.data().text,
            timestamp: doc.data().timestamp?.toMillis() || Date.now(),
          });
        });
        setMessages(messagesData);
      });
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      > */}
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
          contentContainerStyle={styles.flatListContent}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#A0AEC0"
          />
          <TouchableOpacity onPress={sendText} style={styles.sendButton}>
            <Icon name="send" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    color: '#2D3748',
  },
  timestamp: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  input: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: '#2D3748',
  },
  sendButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});