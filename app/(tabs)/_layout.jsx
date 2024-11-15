import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const _layout = () => {
  console.log('kdnc')
  return (
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
      {/* <Tabs.Screen name="../dont_see/mapsScreen" options={{ title: 'Maps' }} /> */}
    </Tabs>
  )
}

export default _layout
