import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useRouter } from 'expo-router'

import { auth } from './../../../configs/firebaseConfig' // Firebase конфигурациясын импорттау
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Логин функциясы
  const handleLogin = async () => {
    try {
      // auth объектісін қолдану
      await signInWithEmailAndPassword(auth, email, password)

      // Кіру сәтті болғанда басты бетке бағыттау
      router.replace('/homeScreen')
    } catch (error) {
      Alert.alert('Қате', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600',
        }}
        style={styles.loginImage}
      />
      <Text style={styles.login}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Your email"
        inputMode="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('auth/sign-up')}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
  },
  login: {
    fontSize: 30,
    padding: 20,
  },
  button: {
    width: 300,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  loginImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
})
