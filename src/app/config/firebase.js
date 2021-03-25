import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDby51SXTgOS7Xh38hUhMqONmp6sd7oWYk",
  authDomain: "revents-17410.firebaseapp.com",
  projectId: "revents-17410",
  storageBucket: "revents-17410.appspot.com",
  messagingSenderId: "684933697931",
  appId: "1:684933697931:web:32cf4606f05cd1d27d1f8e",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
