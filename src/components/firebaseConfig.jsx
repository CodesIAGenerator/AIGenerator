import 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5Ux38OhBaELtiQkuAeFajjY4tzscNUTI",
  authDomain: "shortvideogeneratorai.firebaseapp.com",
  projectId: "shortvideogeneratorai",
  storageBucket: "shortvideogeneratorai.appspot.com",
  messagingSenderId: "850729761936",
  appId: "1:850729761936:web:ef176f3d8b23558e2aec15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;