import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

export default function HomeScreen() {
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
            uri: 'https://static.aviasales.com/psgr-v2/ru/almaty/gory_na_fone_Almaty_1_5f6fc4bc3d.jpg',
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
        <View style={styles.card}>
          <Image
            source={{
              uri: 'https://grandevoyage.kz/wp-content/uploads/2020/12/whatsapp-image-2020-09-22-at-18.07.35-1.jpeg',
            }}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Kolsay</Text>
          <Text style={styles.cardLocation}>Almaty</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={{
              uri: 'https://s.zagranitsa.com/images/articles/4727/870x486/4a92a3b4dd235b38f27c600cc946d00b.jpg?1476776858',
            }}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Medeo</Text>
          <Text style={styles.cardLocation}>Almaty</Text>
        </View>
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
