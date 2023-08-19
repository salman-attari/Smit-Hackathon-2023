// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getStorage, ref , uploadBytes ,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
import { addDoc ,getFirestore, collection } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

var btn=document.getElementById("signup")
btn.addEventListener("click",()=>{
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const fname = document.getElementById("fname").value
  const lname = document.getElementById("lname").value
  const file= document.getElementById("file").files[0];
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    const storageRef = ref(storage, email);

// 'file' comes from the Blob or File API
uploadBytes(storageRef, file).then((snapshot) => {
  console.log('Uploaded a blob or file!');
  getDownloadURL(ref(storage, email))
  .then(async(url) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: fname,
        last: lname,
        url: url,
        email: email
      });
      console.log("Document written with ID: ", docRef.id);
    window.location.href="./sign-in.html"

    } catch (e) {
      console.error("Error adding document: ", e);
    }
   })
  .catch((error) => {
    // Handle any errors
  });
});
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

})
// Initialize Firebase

