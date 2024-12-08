import React from 'react'
import { Text, View } from 'react-native'
import { useSearchParams } from 'expo-router'

const Profile = () => {
  const { userId } = useSearchParams() // Параметрді алу

  // Параметрдің бар-жоғын тексеру
  if (!userId) {
    return (
      <View>
        <Text>No User ID found!</Text>{' '}
        {/* Егер параметр жоқ болса, хабар көрсету */}
      </View>
    )
  }

  return (
    <View>
      <Text>User ID: {userId}</Text>
    </View>
  )
}

export default Profile
