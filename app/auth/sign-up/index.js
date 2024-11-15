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
import firebaseConfig from './../../../configs/firebaseConfig'

export default function Register() {
  const router = useRouter()
  const [name, onChangeName] = React.useState('')
  const [email, onChangeEmail] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  const [confirmPassword, onChangeConfirmPassword] = React.useState('')

  // Тіркеу функциясы
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Парольдер сәйкес емес', 'Қайтадан тексеріңіз')
      return
    }

    try {
      await firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email, password)
      Alert.alert('Тіркелу сәтті өтті!', `${name}, қош келдіңіз!`)
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
        style={styles.registerImage}
      />
      <Text style={styles.register}>Register</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Full Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Your email"
        inputMode="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeConfirmPassword}
        value={confirmPassword}
        secureTextEntry={true}
        placeholder="Confirm your password"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or continue with</Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Continue with Samsung</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.replace('auth/sign-in')}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.signInText}>Sign in</Text>
        </Text>
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
  register: {
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
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  orText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  socialButton: {
    width: 300,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  socialButtonText: {
    color: 'black',
    textAlign: 'center',
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
  },
  signInText: {
    color: 'blue',
  },
  registerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
})
