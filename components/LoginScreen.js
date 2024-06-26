import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Keyboard   } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Replace this URL with your actual authentication endpoint
      const apiUrl = 'https://serious-ascent-412517.ue.r.appspot.com/api/auth';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Authentication successful
        console.log('Authentication successful');
        navigation.navigate('Home');
        // You might want to navigate to the next screen or perform some other action here
      } else {
        // Authentication failed
        const errorData = await response.json();
        Alert.alert('Authentication Failed', errorData.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during authentication:', error.message);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  return (
    
    <View style={styles.linearGradient}>
      
      <View style={styles.gradient}>
      <Image style={styles.image}
        source={require('./logo2.png')} // Replace with the path to your image
      />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="grey"
          autoCapitalize="none"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="grey"
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    paddingBottom: 200,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
    padding: 4,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 16,
    color: 'black',
    paddingHorizontal: 10,
    opacity: 0.7,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linearGradient: {
    flex: 1,
    borderRadius: 5,
  },
  image: {
    width: 280, // Set the width of the image
    height: 65, // Set the height of the image
    resizeMode: 'cover', // Set the resizeMode (cover, contain, stretch, etc.)
    marginBottom: 20,
  },
});

export default LoginScreen;
