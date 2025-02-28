import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const userAvatar = 'https://i.pravatar.cc/150?img=3';
const botAvatar = 'https://i.pravatar.cc/150?img=5';

const Chatbot = () => {
  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (prompt.trim() === '') return;

    const userMessage = {
      type: 'user',
      text: prompt,
      timestamp: new Date(),
    };
    setConversation((prev) => [...prev, userMessage]);
    setPrompt('');
    setIsTyping(true);

    try {
      const response = await fetch('http://192.168.243.154:8000/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_query: prompt,user_info: "The patient is deficiemt in protein" }),
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const data = await response.json();
      console.log('API Response:', data);

      const botMessage = {
        type: 'bot',
        text: data.response || "Sorry, I don't understand that.",
        timestamp: new Date(),
      };
      setConversation((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('API Error:', error.message);
      setConversation((prev) => [
        ...prev,
        { type: 'bot', text: "Sorry, I couldn't process your request.", timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [conversation, isTyping]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chatbot</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContent}
      >
        {conversation.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              msg.type === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            {msg.type === 'bot' && <Image source={{ uri: botAvatar }} style={styles.avatar} />}
            <View style={styles.messageContent}>
              <Text style={styles.messageText}>{msg.text}</Text>
              <Text style={styles.timestamp}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
            {msg.type === 'user' && <Image source={{ uri: userAvatar }} style={styles.avatar} />}
          </View>
        ))}
        {isTyping && (
          <View style={[styles.messageContainer, styles.botMessage]}>
            <Image source={{ uri: botAvatar }} style={styles.avatar} />
            <View style={styles.messageContent}>
              <ActivityIndicator size="small" color="#555" />
              <Text style={styles.typingText}>Bot is typing...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Type a message..."
          placeholderTextColor="#666"
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chatbot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingBottom:50
  },
  header: {
    backgroundColor: '#0D69D7',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chatContent: {
    paddingVertical: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageContent: {
    maxWidth: '70%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  messageText: {
    color: '#333',
    fontSize: 16,
  },
  typingText: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#E6F3FF',
    // backgroundColor: '#FFF',
    padding: 10,
    // elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#0D69D7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});