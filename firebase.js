import firebase from 'firebase';

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyCdnuRUSxucYFFsEMgPStjx55h3ZlMS-00",
    authDomain: "ecommerce-vijay.firebaseapp.com",
    projectId: "ecommerce-vijay",
    storageBucket: "ecommerce-vijay.appspot.com",
    messagingSenderId: "557052355483",
    appId: "1:557052355483:web:9fbed4adc51ab5f953f73e",
    measurementId: "G-XDPK44141D"
  });

  const db = firebaseApp.firestore();

  export default db;

  const auth = firebase.auth();

  const storage = firebase.storage();

  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, storage, provider };