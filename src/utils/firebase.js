import firebase from 'firebase/app';
import "firebase/auth"

export const auth =firebase.initializeApp({ 
    apiKey: "AIzaSyAVsWcZiYj_muIY7GDXGtnt64AE9koM-pw",
    authDomain: "chatomi.firebaseapp.com",
    projectId: "chatomi",
    storageBucket: "chatomi.appspot.com",
    messagingSenderId: "428401059375",
    appId: "1:428401059375:web:f16938aade62a56665c8da"
  }).auth();