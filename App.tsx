import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [inputText, setInputText] = useState(''); // Text input from user
  const [responseText, setResponseText] = useState(''); // AI response

  const handleSend = async () => {
    if (!inputText.trim()) {
      setResponseText('Please enter a sentence.');
      return;
    }
    console.log("Sending msg", inputText)
    try {
      const response = await fetch('http://192.168.29.157:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence: inputText }),
      });
      const data = await response.json();
      console.log("Looking for response", data.response)
      setResponseText(data.response || 'No response');
    } catch (error) {
      console.error('Error:', error);
      setResponseText('Error fetching response.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Single Word Extractor</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your sentence"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Send" onPress={handleSend} />
      <Text style={styles.output}>Response: {responseText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  output: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
