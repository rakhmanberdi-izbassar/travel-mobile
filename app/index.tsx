// index.tsx
import HomeScreen from '@/constants/components/homeScreen'
import { Text, View } from 'react-native'
import { auth } from './../configs/firebaseConfig'
import { Redirect } from 'expo-router'
import TabLayout from './_layout' // TabLayout импорттау

export default function Index() {
  const user = auth.currentUser
  return (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href={'/profileScreen'} /> : <TabLayout />}
    </View>
  )
}
