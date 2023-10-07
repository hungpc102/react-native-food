import { initializeApp } from '@react-native-firebase/app';
import '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBW3ka4-_R7Rvy2cYqWXXraX9qUh34WuM8",
  authDomain: "food-app-73e8b.firebaseapp.com",
  projectId: "food-app-73e8b",
  storageBucket: "food-app-73e8b.appspot.com",
  messagingSenderId: "290807284482",
  appId: "1:290807284482:web:3e7e61291f258172def81b"
};

if (!initializeApp.apps || !initializeApp.apps.length) {
    initializeApp(firebaseConfig);
  }

const storage = initializeApp.storage();

export { storage };
