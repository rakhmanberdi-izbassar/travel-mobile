import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Button,
} from 'react-native'
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import 'react-native-get-random-values'
import * as SplashScreen from 'expo-splash-screen'

const GOOGLE_MAPS_APIKEY = 'AIzaSyDF5zEFAyLSJmwJaPLFI1U9O2Mrc6AYR_A'

export default function MapsScreen() {
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`
      )
      const data = await response.json()
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address // Нақты мекенжайды қайтару
      } else {
        return 'Unknown location' // Егер мекенжай табылмаса
      }
    } catch (error) {
      console.error('Error during reverse geocoding:', error)
      return 'Error fetching location'
    }
  }

  const [mapRegion, setMapRegion] = useState({
    latitude: 43.214422,
    longitude: 76.871302,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [origin, setOrigin] = useState(null)
  const [destinations, setDestinations] = useState([]) // Дестинациялар тізімі
  const [markerLocation, setMarkerLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [heading, setHeading] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [panelHeight, setPanelHeight] = useState(new Animated.Value(0))
  const [isPanelVisible, setIsPanelVisible] = useState(false)

  const userLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      })
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })

      Location.watchHeadingAsync((headingData) => {
        setHeading(headingData.trueHeading)
      })
    } catch (error) {
      console.error('Error fetching location:', error)
      setErrorMsg('Failed to fetch location')
    }
  }

  useEffect(() => {
    userLocation() // Компонент жүктелгенде орналасқан жерді алу
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate
    const newDestination = {
      latitude,
      longitude,
      key: `${latitude}-${longitude}`,
    }

    setDestinations((prevDestinations) => [...prevDestinations, newDestination])
    setMarkerLocation(newDestination)
  }

  const handleRemoveDestination = (key) => {
    setDestinations((prevDestinations) =>
      prevDestinations.filter((destination) => destination.key !== key)
    )
  }

  // Панельдің көрінуін бақылау функциясы
  const togglePanel = () => {
    Animated.timing(panelHeight, {
      toValue: isPanelVisible ? 0 : 250, // Панельдің биіктігін өзгерту
      duration: 300,
      useNativeDriver: false,
    }).start()
    setIsPanelVisible(!isPanelVisible)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={handleMapPress}
      >
        {origin && (
          <Marker
            coordinate={origin}
            title="Your Location"
            rotation={heading}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
          />
        )}
        {destinations.map((destination) => (
          <Marker
            key={destination.key}
            coordinate={destination}
            title="Destination"
          />
        ))}
        {origin &&
          destinations.length > 0 &&
          destinations.map((destination) => (
            <MapViewDirections
              key={destination.key}
              origin={origin} // Ағымдағы орныңыздан маршрут жүргізу
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="blue"
            />
          ))}
      </MapView>

      {/* Төменнен жылжитын панель */}
      <Animated.View style={[styles.panel, { height: panelHeight }]}>
        <View style={styles.sideContainer}>
          <View style={styles.inputContainer}>
            <GooglePlacesAutocomplete
              placeholder="Қайдан"
              fetchDetails={true}
              onPress={(data, details = null) => {
                const { lat, lng } = details.geometry.location
                setOrigin({ latitude: lat, longitude: lng }) // Ағымдағы орын өзгертіледі
              }}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
              }}
              styles={inputStyles}
            />

            <GooglePlacesAutocomplete
              placeholder="Қайда"
              fetchDetails={true}
              onPress={(data, details = null) => {
                const { lat, lng } = details.geometry.location
                const newDestination = {
                  latitude: lat,
                  longitude: lng,
                  key: `${lat}-${lng}`,
                }
                setDestinations((prevDestinations) => [
                  ...prevDestinations,
                  newDestination,
                ])
              }}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
              }}
              styles={inputStyles}
            />
          </View>

          <FlatList
            data={destinations}
            style={styles.toDoList}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text>
                  Destination: {item.latitude.toFixed(4)},{' '}
                  {item.longitude.toFixed(4)}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveDestination(item.key)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
        </View>
      </Animated.View>

      {/* Панельді көрсету/жасыру үшін батырма */}
      <TouchableOpacity style={styles.toggleButton} onPress={togglePanel}>
        <Text style={styles.toggleButtonText}>
          {isPanelVisible ? 'Жасыру' : 'Көрсету'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Вертикаль бойынша бағыттау
  },
  map: {
    width: '100%',
    height: '100%',
  },
  panel: {
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden', // Төменнен жылжитын панельдің шеттерін жасыру
  },
  sideContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 10,
  },
  toDoList: {
    flexGrow: 1,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
  },
  removeText: {
    color: 'red',
    fontWeight: 'bold',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
})

const inputStyles = {
  container: {
    flex: 0,
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
}
