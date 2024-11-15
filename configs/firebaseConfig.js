import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAgqFsNr6J0yAMpct1SOgyHb22PFHcozco',
  authDomain: 'travel-221e6.firebaseapp.com',
  projectId: 'travel-221e6',
  storageBucket: 'travel-221e6.appspot.com',
  messagingSenderId: '564175648857',
  appId: '1:564175648857:android:e0f501aec3de4c28965948',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // Use the default app if already initialized
}

const auth = firebase.auth()
const database = firebase.database()
const storage = firebase.storage()

export { firebase, auth, database, storage }
