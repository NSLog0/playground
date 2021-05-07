import Home from "./components/Home";
import firebase from 'firebase'

import './App.scss'

// const sayHi = new Home('Skel')

// console.log(sayHi.greet())
//
// const firebase = require("firebase");

 // var firebaseConfig = {
 //    apiKey: "AIzaSyDTKBfMmdi6sYV9ppSgS7zs0m0307xIAno",
 //    authDomain: "preve-56ad7.firebaseapp.com",
 //    databaseURL: "https://preve-56ad7.firebaseio.com",
 //    projectId: "preve-56ad7",
 //    storageBucket: "preve-56ad7.appspot.com",
 //    messagingSenderId: "461851245135",
 //    appId: "1:461851245135:web:3f1752b9e276b57f82883a",
 //    measurementId: "G-71CH00NV3S"
 //  };
var firebaseConfig = {
    apiKey: "AIzaSyATiWQezXm7H-GfixB6Mt9UY-YuEVfEcwg",
    authDomain: "rise-coffee-dev.firebaseapp.com",
    projectId: "rise-coffee-dev",
    storageBucket: "rise-coffee-dev.appspot.com",
    messagingSenderId: "377627150668",
    appId: "1:377627150668:web:c6caec869d3d61b4fbe7e9",
    measurementId: "G-VWH0QH8B7X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const email = 'prachaya.su@gmail.com'
const password = '123456'

firebase.auth().createUserWithEmailAndPassword(email, password).catch( err => {
  console.log('-------create--------');
  console.log(err)
  console.log('-----------------');
})
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
  firebase.auth().signInWithEmailAndPassword(email, password).catch( err => {
    console.log('---------signin--------');
    console.log(err)
    console.log('-----------------');
  })
}
                                                                           )
  
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user)
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      console.log(idToken)
    }).catch(function(error) {
      // Handle error
    });
  } else {
    console.log('--------watch e---------');
    console.log(user);
    console.log('--------watch e---------');
  }
});

;
