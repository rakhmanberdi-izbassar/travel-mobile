import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { getAuth, signOut } from 'firebase/auth'

export default function SettingsScreen() {
  const router = useRouter()

  // Sign Out функциясы
  const handleSignOut = async () => {
    try {
      await signOut(getAuth())
      Alert.alert('Сіз жүйеден шықтыңыз!', 'Сіз сәтті шығып кеттіңіз')
      router.replace('/auth/sign-in') // Қолданушыны логин бетіне қайта бағыттау
    } catch (error) {
      Alert.alert('Қате', error.message)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Settings Screen</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={{ backgroundColor: 'black', padding: 10, borderRadius: 10 }}
      >
        <Text style={{ color: 'white' }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

// import React, { useState } from 'react'
// import { View, TextInput, Button, Text } from 'react-native'
// import { getAuth, updateProfile } from 'firebase/auth'

// const UpdateProfileScreen = () => {
//   const [name, setName] = useState('')
//   const [error, setError] = useState('')

//   const updateName = async () => {
//     const auth = getAuth()
//     const user = auth.currentUser

//     if (user) {
//       try {
//         await updateProfile(user, {
//           displayName: name,
//         })
//         alert('Аты сәтті өзгертілді')
//       } catch (error) {
//         setError(error.message)
//       }
//     }
//   }

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Қолданушының атын өзгерту</Text>
//       <TextInput
//         value={name}
//         onChangeText={setName}
//         placeholder="Атыңызды енгізіңіз"
//         style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
//       />
//       {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
//       <Button title="Атын жаңарту" onPress={updateName} />
//     </View>
//   )
// }

// export default UpdateProfileScreen
