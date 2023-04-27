// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL3obbdFrdAWfKFcVXEM0Y9Hhip082cXM",
  authDomain: "uplaodingfile-cd345.firebaseapp.com",
  projectId: "uplaodingfile-cd345",
  storageBucket: "uplaodingfile-cd345.appspot.com",
  messagingSenderId: "504842053384",
  appId: "1:504842053384:web:535cb2806de238a85e6ebd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);