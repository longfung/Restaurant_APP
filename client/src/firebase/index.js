import firebase from "firebase/app";
import "firebase/storage";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAsTfaz1pSzUFvkVwAfcaHqW9jN1E-TWbA",
  authDomain: "mytakeorder.firebaseapp.com",
  databaseURL: "https://mytakeorder.firebaseio.com",
  projectId: "mytakeorder",
  storageBucket: "mytakeorder.appspot.com",
  messagingSenderId: "731218543864",
  appId: "1:731218543864:web:6a8ba00d44c713f316270d"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };
