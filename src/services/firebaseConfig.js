import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyDEHXbndZKxA4nFA2OaC8YR6hErSO5dt4Y',
  authDomain: 'avalon-webgame.firebaseapp.com',
  databaseURL: 'https://avalon-webgame.firebaseio.com',
  projectId: 'avalon-webgame',
  storageBucket: 'avalon-webgame.appspot.com',
  messagingSenderId: '241088836458',
  appId: '1:241088836458:web:1fec19f6d8f6aff5296b13'
}

firebase.initializeApp(config)

const db = firebase.database()
const auth = firebase.auth()

export {
  db, auth
}
