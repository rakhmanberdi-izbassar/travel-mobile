import React, { useState } from 'react'
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { storage, database } from '../../configs/firebaseConfig'
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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    if (!image) return

    // Суретті Blob форматында алу
    const response = await fetch(image)
    const blob = await response.blob()

    // Суретті Firebase Storage-ке жүктеу
    const imageRef = storageRef(storage, `images/${Date.now()}`)
    await uploadBytes(imageRef, blob)
    const url = await getDownloadURL(imageRef)

    // Деректерді Firebase Realtime Database-ке сақтау
    try {
      await set(dbRef(database, 'uploads/' + Date.now()), {
        title: title,
        description: description,
        imageUrl: url,
      })
      console.log('Data saved successfully!') // Успешное сообщение
      // Пішінді тазалау
      setTitle('')
      setDescription('')
      setImage(null)
    } catch (error) {
      console.error('Error saving data: ', error) // Қате туралы хабар
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
