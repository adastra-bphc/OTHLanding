document.addEventListener("DOMContentLoaded", function() {
    var registerForm = document.querySelector('.register-form');
    var loginForm = document.querySelector('.login-form');
    var forgotpassword = document.querySelector('.forgot-password');
    var loginLink = document.querySelector('.message a');
    var registerLink = document.querySelector('.login-form .message a');
    var forgotLink = document.querySelector('#forgot-password');
    var rememberLink = document.querySelector('.forgot-password .message a');

    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
    forgotpassword.style.display = 'none';

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotpassword.style.display = 'none';
    });

    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        forgotpassword.style.display = 'none';
    });
    forgotLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'none';
        forgotpassword.style.display = 'block';
    });
    rememberLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        forgotpassword.style.display = 'none';
    });
});

// FIREBASE BACKEND //

console.log("running registration.js")
import{ getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, setDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
const db = getFirestore();
const auth = getAuth();
console.log(auth)

const signUpBtn = document.querySelector(".signup-btn")

console.log(signUpBtn)
document.getElementById("signup-form").addEventListener("submit", (e)=> {
    e.preventDefault()
})

onAuthStateChanged(auth, (user)=> {
    if(user){
         //alert("registered")
        //location.replace("index.html")
    }
})

const signUpClicked = async()=>{
    var signUpEmail= document.getElementById("signup-email").value;
    var signUpPassword = document.getElementById("signup-password").value;
    var name = document.getElementById("name").value;
    var institute = document.getElementById("institute-name").value;
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential)=>{
        const user=auth.currentUser
        const ref = doc(db, 'users', user.uid);
        const docRef = setDoc(ref,{
            uid: user.uid,
            email : user.email,
            password: password,
            name: name,
            institute: institute
        });
        try{
            sendEmailVerification(user)
            .then(()=>{
                alert("Email Verification link sent")
            })
            .catch((error=>{
                alert(error)
            }))
        }
        catch{
            alert(error)
        }
    })
    .catch((error=>{
        console.log(error)
        alert(error)
    }))
}

signUpBtn.addEventListener("click", signUpClicked)