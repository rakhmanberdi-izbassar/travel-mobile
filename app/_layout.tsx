import { Stack } from 'expo-router'
import AuthProvider from './context/AuthProvider' // AuthProvider файлын қосу

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthProvider>
  )
}
