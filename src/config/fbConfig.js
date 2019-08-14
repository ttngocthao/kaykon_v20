import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
//import 'firebase/database'
console.log("firebase", firebase);
const firebaseConfig = {
  apiKey: "AIzaSyAEmBicx193bs0AUyCyQ_eJ4XQMg7lvtMA",
  authDomain: "kaykon-f2de2.firebaseapp.com",
  databaseURL: "https://kaykon-f2de2.firebaseio.com",
  projectId: "kaykon-f2de2",
  storageBucket: "kaykon-f2de2.appspot.com",
  messagingSenderId: "216600300476",
  appId: "1:216600300476:web:4914ac34d37a8f2c"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
