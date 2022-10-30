// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1gMK5fCyIPePpgXwqODO1UHuozX0_VnU",
  authDomain: "udemy-birthday-7f22b.firebaseapp.com",
  projectId: "udemy-birthday-7f22b",
  storageBucket: "udemy-birthday-7f22b.appspot.com",
  messagingSenderId: "796105523227",
  appId: "1:796105523227:web:f265bac508b83bba81b8be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };