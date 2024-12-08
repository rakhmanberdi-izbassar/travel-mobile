import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { db, auth } from './../../configs/firebaseConfig'
import { useRouter } from 'expo-router'

export default function Search() {
  const router = useRouter()

  const [users, setUsers] = useState([]) // Қолданушылар тізімі
  const [loading, setLoading] = useState(true) // Жүктелу статусын бақылау

  // Firebase-тан қолданушыларды алу функциясы
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users') // 'users' коллекциясына сілтеме
      const snapshot = await getDocs(usersCollection) // Деректерді алу
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) // Деректерді массивке айналдыру
      setUsers(userList) // Тізімді сақтау
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false) // Жүктелу статусын өшіру
    }
  }

  // Подписка қосу/алы алу функциясы
  const handleSubscription = async (userId, isSubscribed) => {
    try {
      const userRef = doc(db, 'users', userId)
      await setDoc(
        userRef,
        { subscribed: !isSubscribed }, // подписканы өзгерту
        { merge: true }
      )
      fetchUsers()
    } catch (error) {
      console.error('Error updating subscription status:', error)
    }
  }

  // Компонент жүктелген кезде деректерді алу
  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Image
              source={{ uri: item.profilePicture }}
              style={styles.profilePic}
            />
            <View>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userUsername}>{item.username}</Text>
              <Button
                title={item.subscribed ? 'Unsubscribe' : 'Subscribe'}
                onPress={() => handleSubscription(item.id, item.subscribed)}
              />
              <Button
                title="View Profile"
                onPress={() => {
                  console.log('Navigating with ID:', item.id) // Консольге шығару
                  router.push(`/dont_see/Profile?userId=${item.id}`) // 'userId' параметрін жіберу
                }}
              />
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userUsername: {
    fontSize: 14,
    color: 'gray',
  },
})
