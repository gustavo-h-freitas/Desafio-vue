/* eslint-disable */
import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCgzRrMRO2h8QYmyFrzFVIF6VYgjA9YMgs",
    authDomain: "projeto-desafio-e5cf5.firebaseapp.com",
    projectId: "projeto-desafio-e5cf5",
    storageBucket: "projeto-desafio-e5cf5.appspot.com",
    messagingSenderId: "271469082578",
    appId: "1:271469082578:web:98830db2696c4a9ddcfa0b"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebaseApp.firestore();

export { db, firebase };