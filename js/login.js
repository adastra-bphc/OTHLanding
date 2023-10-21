document.addEventListener("DOMContentLoaded", function() {
    var registerForm = document.querySelector('.register-form');
    var loginForm = document.querySelector('.login-form');
    var forgotpassword = document.querySelector('.forgot-password');
    var loginLink = document.querySelector('.message a');
    var registerLink = document.querySelector('.login-form .message a');
    var forgotLink = document.querySelector('#forgot-password');
    var rememberLink = document.querySelector('.forgot-password .message a');

    // registerForm.style.display = 'block';
    loginForm.style.display = 'block';
    forgotpassword.style.display = 'none';

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        // registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotpassword.style.display = 'none';
    });

    // registerLink.addEventListener('click', function(event) {
    //     event.preventDefault();
    //     loginForm.style.display = 'none';
    //     registerForm.style.display = 'block';
    //     forgotpassword.style.display = 'none';
    // });
    forgotLink.addEventListener('click', function(event) {
        event.preventDefault();
        // registerForm.style.display = 'none';
        loginForm.style.display = 'none';
        forgotpassword.style.display = 'block';
    });
    rememberLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'block';
        //registerForm.style.display = 'none';
        forgotpassword.style.display = 'none';
    });
});

// FIREBASE BACKEND //

console.log("running login.js")
import{ getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, setDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
const db = getFirestore();
const auth = getAuth();
console.log(auth)

const logInBtn = document.querySelector(".login-btn")
const pwdBtn = document.querySelector(".fpassword-btn")
const logOutBtn = document.querySelector('.log-out');
logOutBtn.style.display = "none";

console.log(logInBtn)
document.getElementById("login-form").addEventListener("submit", (e)=> {
    e.preventDefault()
})

document.getElementById("fpassword-form").addEventListener("submit", (e)=> {
    e.preventDefault()
})

onAuthStateChanged(auth, async(user)=> {
    if(user){
         logOutBtn.style.display = "block";
        console.log(user)
        // location.replace("stage0.html")
    }
    else{
        logOutBtn.style.display = "none";
    }
})

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence successfully set to  local")
  })
  .catch((error) => {
    // Handle errors if persistence couldn't be set
    console.error('Error setting persistence:', error);
  });

const logInClicked = async()=>{
    const logInEmail= document.getElementById("login-email").value;
    const logInPassword = document.getElementById("login-password").value;
    await signInWithEmailAndPassword(auth, logInEmail, logInPassword)
    .then((userCredential)=>{
        const user=auth.currentUser
        console.log(user)
        if(!user.emailVerified){
            alert("Please verify email before signing in.\nCheck your registered email for the link");
            signOut(auth);
        }
        else{
            alert("You have been Logged In");
        }
    })
    .catch((error=>{
        console.log(error)
        alert(error)
    }))
}

const pwdBtnClicked = async()=>{
    var resetEmail = document.getElementById("reset-email").value
    
    await sendPasswordResetEmail(auth, resetEmail)
    .then(()=>{
        alert("Password reset email sent successfully!")
    })
    .catch((error)=>{
        console.log(error)
        alert(error)
    })
}

const logOutClicked = async()=>{
    await signOut(auth);
}

logInBtn.addEventListener("click", logInClicked)
pwdBtn.addEventListener("click", pwdBtnClicked)
logOutBtn.addEventListener("click", logOutClicked)



//DISABLING INSPECT//

// Disable right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};