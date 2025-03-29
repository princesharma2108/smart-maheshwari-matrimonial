// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyCN3CN5YrvFUXt-bN8K0vUURCu-4TL6HTw',
//   authDomain: 'signin-93dee.firebaseapp.com',
//   projectId: 'signin-93dee',
//   storageBucket: 'signin-93dee.firebasestorage.app',
//   messagingSenderId: '891795920033',
//   appId: '1:891795920033:web:17cf7389b6e543f409cce0',
//   measurementId: 'G-4JT4Z1XDH6'
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
};
const firebaseConfigMatrimonial = {
  apiKey: 'AIzaSyAZEpYTaic23mBkT8wyOIxMFnbx5yFXXyw',
  appId: '1:19656368995:web:90573fb7464bcb7d0b6956',
  messagingSenderId: '19656368995',
  projectId: 'miiscosmartmatrimonial',
  authDomain: 'miiscosmartmatrimonial.firebaseapp.com',
  storageBucket: 'miiscosmartmatrimonial.appspot.com',
  measurementId: 'G-H3HTXQEMJK'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfigMatrimonial);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
