import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAh_ybL-PlFINSusMDR_oOj3p86wRI-sw8",
  authDomain: "financial-tracker-583e7.firebaseapp.com",
  projectId: "financial-tracker-583e7",
  storageBucket: "financial-tracker-583e7.appspot.com",
  messagingSenderId: "899427804312",
  appId: "1:899427804312:web:02529c671bd77ed8275ced",
  measurementId: "G-WVZT5GGNJV"
};

const app = initializeApp(firebaseConfig)
const fireDb = getFirestore(app)

export {fireDb, app}