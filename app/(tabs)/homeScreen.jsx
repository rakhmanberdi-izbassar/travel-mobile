import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { database } from './../../configs/firebaseConfig'
import { ref as dbRef, onValue } from 'firebase/database'

export default function HomeScreen() {
  const [uploads, setUploads] = useState([])

  useEffect(() => {
    const uploadsRef = dbRef(database, 'uploads/')

    const unsubscribe = onValue(uploadsRef, (snapshot) => {
      const data = snapshot.val()

      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
        setUploads(formattedData)
      } else {
        setUploads([])
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <Text style={styles.headerSubtitle}>Choose your favorite place</Text>
      </View>

      {/* Featured Image */}
      {uploads.map((upload) => (
        <View key={upload.id} style={styles.featured}>
          {upload.imageUrl && (
            <Image
              source={{ uri: upload.imageUrl }}
              style={styles.featuredImage}
            />
          )}
          <Text style={styles.cardTitle}>{upload.title}</Text>
          <Text style={styles.cardLocation}>{upload.description}</Text>
          {/* <View style={styles.featuredTextContainer}>
            <Text style={styles.featuredTitle}>Explore your beauty</Text>
            <Text style={styles.featuredSubtitle}>
              Get special offers and discounts
            </Text>
          </View> */}
        </View>
      ))}
      {/* Recommended Section */}
      <View style={styles.recommendedHeader}>
        <Text style={styles.recommendedTitle}>Recommended</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.recommended}
      >
        {uploads.map((upload) => (
          <View key={upload.id} style={styles.card}>
            {upload.imageUrl && (
              <Image
                source={{ uri: upload.imageUrl }}
                style={styles.cardImage}
              />
            )}
            <Text style={styles.cardTitle}>{upload.title}</Text>
            <Text style={styles.cardLocation}>{upload.description}</Text>
          </View>
        ))}
      </ScrollView>
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
  seeAll: {
    fontSize: 14,
    color: '#4C9AFF',
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
