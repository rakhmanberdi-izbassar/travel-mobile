import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { db } from './../../configs/firebaseConfig' // Firebase конфигурациясын импорттаңыз
import { doc, getDoc } from 'firebase/firestore'

export default function Profile() {
  const router = useRouter()
  const { userId } = router.query // Параметрді алу (userId)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userRef = doc(db, 'users', userId) // Firebase-те қолданушы деректерін алу
        const userSnapshot = await getDoc(userRef)
        if (userSnapshot.exists()) {
          setUser(userSnapshot.data())
        }
      }
    }
    fetchUserData()
  }, [userId])

  if (!user) {
    return <Text>Loading...</Text>
  }

  return (
    <View>
      <Text>Name: {user.name}</Text>
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      {/* Қажет болған жағдайда басқа ақпаратты да көрсетіңіз */}
    </View>
  )
}
