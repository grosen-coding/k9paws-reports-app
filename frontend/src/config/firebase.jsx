// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCL9EnKUBejFcM7DcR6phyjycVwmoqCuEk",
//   authDomain: "gary-rosen-project3.firebaseapp.com",
//   databaseURL: "https://gary-rosen-project3-default-rtdb.firebaseio.com",
//   projectId: "gary-rosen-project3",
//   storageBucket: "gary-rosen-project3.appspot.com",
//   messagingSenderId: "151175881525",
//   appId: "1:151175881525:web:80c1be98c9fe943196e27c",
// };

// // Use this to initialize the firebase App
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// // Use these for db & auth
// const db = firebaseApp.firestore();
// const auth = firebase.auth();

// export { auth, db };

import firebase from "firebase/app";
import "firebase/firebase-database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL9EnKUBejFcM7DcR6phyjycVwmoqCuEk",
  authDomain: "gary-rosen-project3.firebaseapp.com",
  databaseURL: "https://gary-rosen-project3-default-rtdb.firebaseio.com",
  projectId: "gary-rosen-project3",
  storageBucket: "gary-rosen-project3.appspot.com",
  messagingSenderId: "151175881525",
  appId: "1:151175881525:web:80c1be98c9fe943196e27c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
