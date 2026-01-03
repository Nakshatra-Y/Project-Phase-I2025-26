// firebase.ts
import { initializeApp } from "firebase/app"; // Imports the core Firebase app initialization function
import { getFirestore } from "firebase/firestore"; // Imports the function to get a Firestore instance

// Your web app's Firebase configuration - THIS IS UNIQUE TO YOUR PROJECT
const firebaseConfig = {
  apiKey: "AIzaSyC...", // Your API Key
  authDomain: "speakup-16dd4.firebaseapp.com", // Your Auth Domain
  projectId: "speakup-16dd4", // Your project ID
  storageBucket: "speakup-16dd4.appspot.com", // Your Storage Bucket
  messagingSenderId: "109954963316", // Your Messaging Sender ID
  appId: "1:109954963316:web:b4808e8f961b46e7f0fe21" // Your App ID
};

// Initialize Firebase with your project's configuration
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service.
// 'db' now holds the connection to your Firestore database.
const db = getFirestore(app);

// Export 'db' so you can use it in other parts of your application (e.g., to read/write data)
export { db };