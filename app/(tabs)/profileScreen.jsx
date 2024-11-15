import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native'
import MapView from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRouter } from 'expo-router'

export default function ProfileScreen() {
  const router = useRouter()
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.push('/dont_see/SettingsScreen')}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Image
        style={styles.profileImage}
        source={{
          uri: 'https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg',
        }}
      />
      <Text style={styles.profileName}>Rakhmanberdi Izbassar</Text>
      <Text style={styles.profileEmail}>rakhmanberdi2003@gmail.com</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <ScrollView style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => router.push('/dont_see/mapsScreen')}
          style={styles.mapPreview}
        >
          <MapView
            style={{ width: '100%', height: 150 }}
            region={{
              latitude: 43.214422,
              longitude: 76.871302,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  mapPreview: {
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },
})
