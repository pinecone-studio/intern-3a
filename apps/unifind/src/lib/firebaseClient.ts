import { getApps, initializeApp } from 'firebase/app';
import { getMessaging, isSupported, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyALwJcJgU-UzL-94Grz6QmwGc9hgj7XqSY',
  authDomain: 'unifind-27e78.firebaseapp.com',
  projectId: 'unifind-27e78',
  storageBucket: 'unifind-27e78.firebasestorage.app',
  messagingSenderId: '444885524114',
  appId: '1:444885524114:web:5bc97569e2c91bc960904b',
  measurementId: 'G-S7X0RDESYY',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Messaging variable-ийг type тодорхойлж өгөх
let messaging: Messaging | undefined;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
}

export { app, messaging };
