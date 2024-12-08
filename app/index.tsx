import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { AuthContext } from './context/AuthProvider'
import { Redirect } from 'expo-router'

export default function Index() {
  const { user } = useContext(AuthContext)

  // Егер қолданушы жоқ болса, логин бетіне бағыттау
  if (!user) {
    return <Redirect href="/auth/sign-in" />
  }

  // Қолданушы болса, профиль бетіне бағыттау
  return <Redirect href="/profileScreen" />
}
