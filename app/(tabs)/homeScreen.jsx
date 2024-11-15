import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { db } from '../../configs/firebaseConfig' // Firebase конфигурациясын импорттаңыз

export default function HomeScreen() {
  const [routes, setRoutes] = useState([])

  // Firebase-тен маршруттарды алу
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'routes'))
        const routesList = querySnapshot.docs.map((doc) => doc.data())
        setRoutes(routesList)
      } catch (error) {
        console.error('Маршруттарды алу қателігі: ', error)
      }
    }

    fetchRoutes()
  }, [])

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <Text style={styles.headerSubtitle}>Choose your favorite place</Text>
      </View>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      {/* Featured Image */}
      <View style={styles.featured}>
        <Image
          source={{
            uri: 'https://www.gov.kz/uploads/2023/4/5/02aa6e81ed05465f446bb1ecefa0647d_original.280018.jpg',
          }}
          style={styles.featuredImage}
        />
        <View style={styles.featuredTextContainer}>
          <Text style={styles.featuredTitle}>Explore your beauty</Text>
          <Text style={styles.featuredSubtitle}>
            Get special offers and discounts
          </Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        <TouchableOpacity
          style={[styles.categoryButton, styles.activeCategory]}
        >
          <Text style={styles.categoryText}>🏖️ Beach</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>⛰️ Mountain</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>🏙️ City</Text>
        </TouchableOpacity>
      </View>

      {/* Маршруттар тізімі */}
      <View style={styles.recommendedHeader}>
        <Text style={styles.recommendedTitle}>Your Saved Routes</Text>
      </View>

      {/* Маршруттарды көрсететін FlatList */}
      <FlatList
        data={routes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD6imEjlLHfuQUDISYrglv1eCD3qKRkc8iEA&s',
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>
              From: {item.origin.latitude}, {item.origin.longitude}
            </Text>
            {item.destinations.map((destination, idx) => (
              <Text key={idx} style={styles.cardLocation}>
                To: {destination.latitude}, {destination.longitude}
              </Text>
            ))}
          </View>
        )}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  searchBox: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  featured: {
    position: 'relative',
    marginBottom: 20,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  featuredTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#fff',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeCategory: {
    backgroundColor: '#4C9AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#fff',
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recommendedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recommended: {
    flexDirection: 'row',
  },
  card: {
    width: 150,
    marginRight: 15,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardLocation: {
    fontSize: 12,
    color: '#888',
  },
})
