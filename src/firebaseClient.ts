import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaC3OOuptlmCxHyZmX_UxpEYL4EdA_zdY",
  authDomain: "badgateway-d7f8a.firebaseapp.com",
  projectId: "badgateway-d7f8a",
  storageBucket: "badgateway-d7f8a.appspot.com",
  messagingSenderId: "566484795626",
  appId: "1:566484795626:web:cbd4351857794915b41793"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }