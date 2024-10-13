import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
    apiKey: "AIzaSyBkImVlGNm7Da9JN0xJA6qkZXDIXRPIOtg",
    authDomain: "fir-firebase-admin-aceec.firebaseapp.com",
    projectId: "fir-firebase-admin-aceec",
    storageBucket: "fir-firebase-admin-aceec.appspot.com",
    messagingSenderId: "441905229499",
    appId: "1:441905229499:web:219603d1af9bc5a1a3c39e",
    measurementId: "G-DTGELGRTLG",
};

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage)
});
