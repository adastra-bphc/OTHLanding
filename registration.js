console.log("running registration.js")
import{ getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
const auth = getAuth();
console.log(auth)

const signUpBtn = document.querySelector(".signup-btn")


console.log(signUpBtn)
document.getElementById("signUpForm").addEventListener("submit", (e)=> {
    e.preventDefault()
})

onAuthStateChanged(auth, (user)=> {
    if(user){
         //alert("registered")
        //location.replace("index.html")
    }
})

const signUpClicked = ()=>{
    const email= document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials)=>{
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            alert("Email Verification link sent")
        })
    })
    .catch((error=>{
        alert(error)
    }))
}

signUpBtn.addEventListener("click", signUpClicked)