// firebase-messaging-sw.js

// 1. Firebase сангуудыг импортлох
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// 2. Ажиллаж эхэлснийг мэдэгдэх (Debug хийхэд хэрэгтэй)
console.log('[Service Worker] Файл ачаалж эхэллээ...');

// 3. Firebase-ийг эхлүүлэх
firebase.initializeApp({
  apiKey: 'AIzaSyALwJcJgU-UzL-94Grz6QmwGc9hgj7XqSY',
  authDomain: 'unifind-27e78.firebaseapp.com',
  projectId: 'unifind-27e78',
  storageBucket: 'unifind-27e78.firebasestorage.app',
  messagingSenderId: '444885524114',
  appId: '1:444885524114:web:5bc97569e2c91bc960904b',
});

const messaging = firebase.messaging();

// 4. Background мэдэгдэл хүлээн авах
messaging.onBackgroundMessage((payload) => {
  console.log('[Service Worker] Background мэдэгдэл ирлээ: ', payload);

  const notificationTitle = payload.notification?.title || 'Шинэ мэдэгдэл';
  const notificationOptions = {
    body: payload.notification?.body || 'Танд шинэ мэдээлэл ирлээ.',
    icon: '/favicon.ico', // Зураг таны public фолдерт байгаа эсэхийг шалгаарай
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 5. Шинэ хувилбар ирэхэд шууд идэвхжүүлэх (skipWaiting-ийг автоматжуулах)
self.addEventListener('install', () => {
  self.skipWaiting();
});
