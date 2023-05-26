// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxIoRWQIIL1lZfT-gunSdImPkOfqQ-W_g",
  authDomain: "rubrica-desarrollo-web.firebaseapp.com",
  projectId: "rubrica-desarrollo-web",
  storageBucket: "rubrica-desarrollo-web.appspot.com",
  messagingSenderId: "902796283840",
  appId: "1:902796283840:web:099b0ccd6c57d434694225"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase