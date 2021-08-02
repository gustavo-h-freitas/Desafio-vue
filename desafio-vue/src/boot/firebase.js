import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCCbC13W0H-mOWMAAz0d2XgL7D5KT6b1HU",
  authDomain: "desafio-vue-bb88a.firebaseapp.com",
  projectId: "desafio-vue-bb88a",
  storageBucket: "desafio-vue-bb88a.appspot.com",
  messagingSenderId: "845929965050",
  appId: "1:845929965050:web:5950718ff1b7347d17b043"
}

let firebaseApp = firebase.initializeApp(firebaseConfig);

export { firebase }
