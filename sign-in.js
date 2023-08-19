// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyA-ZedvYNPNBlQyQy26d5PhbrO-IaLR5qA",
  authDomain: "signup-89c7a.firebaseapp.com",
  databaseURL: "https://signup-89c7a-default-rtdb.firebaseio.com",
  projectId: "signup-89c7a",
  storageBucket: "signup-89c7a.appspot.com",
  messagingSenderId: "987788007116",
  appId: "1:987788007116:web:700c56d573a8bc26e91469",
  measurementId: "G-6BH951H5WV"

};
;

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
var btn=document.getElementById("login")
btn.addEventListener("click",()=>{
  const email = document.getElementById("email2").value
  const password = document.getElementById("password2").value
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    window.location.href="./blog.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

})
// Initialize Firebase
