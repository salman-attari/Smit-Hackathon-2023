import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyA-ZedvYNPNBlQyQy26d5PhbrO-IaLR5qA",
    authDomain: "signup-89c7a.firebaseapp.com",
    projectId: "signup-89c7a",
    storageBucket: "signup-89c7a.appspot.com",
    messagingSenderId: "987788007116",
    appId: "1:987788007116:web:700c56d573a8bc26e91469",
    measurementId: "G-6BH951H5WV"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const btn = document.getElementById('submit')
const inp = document.getElementById('entry')
const todo = document.getElementById('todo-list')



btn.addEventListener('click', async () => {
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            todo: inp.value
        });
        Swal.fire({
            title: `Todo Added`,
            icon: 'success',
            background: '#919191',
            confirmButtonColor: '#222222',





        }).then(() => {
            location.reload()
        })
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        Swal.fire({
            title: `An Error Occured Adding Todo`,
            icon: 'error'
        })
        console.error("Error adding document: ", e);
    }
})
async function showTodos() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        todo.innerHTML += `
        <li class="list-item">
                <p class="text">${doc.data().todo}</p>
                <i class='fas fa-edit' onclick='UpTodo("${doc.id}")'></i>
                <i class='fa-solid fa-trash' onclick='delTodo("${doc.id}")'></i>
            </li>
        `
    });

}
showTodos()




function delTodo(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Data Will Lost and Never Come Back",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#222222',
        cancelButtonColor: '#222222',
        confirmButtonText: 'Yes, delete it!',
        background: '#919191',




    }).then(async (result) => {
        if (result.isConfirmed) {

            Swal.fire(


                'Deleted!',
                'Your Data has been deleted.',
                'success',


            )

            await deleteDoc(doc(db, "todos", id));



            location.reload();
        }
    })
}

window.delTodo = delTodo;



function UpTodo(id) {
    const doneit = doc(db, "todos", id);
    Swal.fire({
        title: `Enter Your Data to Replace With`,
        input: 'text',
        confirmButtonText: 'Replace / Edit !',
        showLoaderOnConfirm: true,
        confirmButtonColor: '#222222',
        background: '#919191',

    }).then(async (result) => {
        if (result.isConfirmed) {
            await updateDoc(doneit, {
                todo: result.value + " (edited on " + new Date().getHours() + ":" + new Date().getMinutes() + " )"
            });
            Swal.fire({
                title: `Your Data Has been Updated`,
                icon: 'success',
                background: '#919191',
                confirmButtonColor: '#222222',




            }).then(() => {
                location.reload()
            })
        }
    })
}
window.UpTodo = UpTodo