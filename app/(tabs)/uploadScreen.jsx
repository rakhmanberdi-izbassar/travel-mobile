import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { storage, database } from './../../configs/firebaseConfig'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import { ref as dbRef, set } from 'firebase/database'

export default function Search() {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Сурет таңдау функциясы
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Please grant camera roll permissions to use this feature.'
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Жаңартылған медиа түрі
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  // Суретті жүктеу функциясы
  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select an image.')
      return
    }

    try {
      // Суретті Blob форматында алу
      const response = await fetch(image)
      const blob = await response.blob()

      // Суретті Firebase Storage-ке жүктеу
      const imageRef = storageRef(storage, `images/${Date.now()}`)
      await uploadBytes(imageRef, blob)
      const url = await getDownloadURL(imageRef)

      // Деректерді Firebase Realtime Database-ке сақтау
      await set(dbRef(database, 'uploads/' + Date.now()), {
        title: title,
        description: description,
        imageUrl: url,
      })
      console.log('Data saved successfully!')

      // Пішінді тазалау
      setTitle('')
      setDescription('')
      setImage(null)

      Alert.alert('Success', 'Data uploaded successfully!')
    } catch (error) {
      console.error('Error saving data: ', error)
      Alert.alert('Error', 'Failed to upload data. Please try again.')
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Upload Photo" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Photo Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Submit" onPress={uploadImage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
})
