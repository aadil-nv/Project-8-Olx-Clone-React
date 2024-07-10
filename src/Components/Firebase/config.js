import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD4Q3YJkKlUurNymUGd7EoabAqE88lkwxM",
  authDomain: "olx-clone2-1e5f2.firebaseapp.com",
  projectId: "olx-clone2-1e5f2",
  storageBucket: "olx-clone2-1e5f2.appspot.com",
  messagingSenderId: "285188308904",
  appId: "1:285188308904:web:3f7934b9934b1205d4a79d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
