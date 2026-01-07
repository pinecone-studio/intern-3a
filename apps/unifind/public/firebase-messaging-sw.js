importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyALwJcJgU-UzL-94Grz6QmwGc9hgj7XqSY',
  authDomain: 'unifind-27e78.firebaseapp.com',
  projectId: 'unifind-27e78',
  storageBucket: 'unifind-27e78.firebasestorage.app',
  messagingSenderId: '444885524114',
  appId: '1:444885524114:web:5bc97569e2c91bc960904b',
});

const messaging = firebase.messaging();
