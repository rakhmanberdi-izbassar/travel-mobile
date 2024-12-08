import React from 'react'
import { NavigationContainer } from '@react-navigation/native' // NavigationContainer импорттау
import AuthProvider from './../context/AuthProvider' // AuthProvider импорттау
import { Tabs } from 'expo-router' // Tabs импорттау
import { Ionicons } from '@expo/vector-icons'

export default function RootLayout() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="homeScreen"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: 'Search',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="uploadScreen"
            options={{
              title: 'Upload',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cloud-upload" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profileScreen"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </AuthProvider>
    </NavigationContainer>
  )
}
