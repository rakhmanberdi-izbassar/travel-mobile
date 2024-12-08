// firebaseConfig.js
import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore' // Firestore импорттау
import { getStorage } from 'firebase/storage'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

// Firebase конфигурациясы
const firebaseConfig = {
  apiKey: 'AIzaSyAgqFsNr6J0yAMpct1SOgyHb22PFHcozco',
  authDomain: 'travel-221e6.firebaseapp.com',
  projectId: 'travel-221e6',
  storageBucket: 'travel-221e6.appspot.com',
  messagingSenderId: '564175648857',
  appId: '1:564175648857:android:e0f501aec3de4c28965948',
}

// Firebase инициализациясы
const app = initializeApp(firebaseConfig)

// Firebase аутентификациясын AsyncStorage-пен инициализациялау
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

// Firebase қызметтеріне қолжетімділік
const database = getDatabase(app)
const storage = getStorage(app)
const db = getFirestore(app) // Firestore инициализациясы

export { auth, database, storage, db } // Firestore-ды экспорттау
