//IMPORTANT IMPORTS DO NOT TOUCH//
import{ getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, arrayUnion, getDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
const db = getFirestore();
const auth = getAuth();
// var user = auth.currentUser;
//IMPORTANT IMPORTS DO NOT TOUCH//


var loginForm = document.querySelector('.login-form');
var forgotpassword = document.querySelector('.forgot-password');
var loginLink = document.querySelector('.message a');
var forgotLink = document.querySelector('#forgot-password');
var rememberLink = document.querySelector('.forgot-password .message a');
var welcomeModal = document.querySelector('.welcome-modal');
var loginModal = document.querySelector('.login-page');
var stage0Modal = document.querySelector('.stage0-modal');
var stage0Btn = document.querySelector('.stage0-btn');
var navItems = document.querySelector('.navbar-items');
var returnBtn = document.querySelector('.return-btn');
var statsModal = document.querySelector('.stats-modal');
var statsOpen = document.querySelector('.stats-open');
var statsClose = document.querySelector('.stats-close');
var stgentry=0;
var stage0entry;

loginModal.style.display = 'block';
forgotpassword.style.display = 'none';
welcomeModal.style.display = 'none';
stage0Modal.style.display = 'none';
navItems.style.display = 'none';
statsModal.style.display='none';

loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginForm.style.display = 'block';
    forgotpassword.style.display = 'none';
});

forgotLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginForm.style.display = 'none';
    forgotpassword.style.display = 'block';
});
rememberLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginForm.style.display = 'block';
    forgotpassword.style.display = 'none';
});
const stage0BtnClicked = async()=>{
    stgentry+=1;
    getUserData();
    event.preventDefault();
    welcomeModal.style.display = 'none';
    stage0Modal.style.display = 'block';
    if(stgentry==1){
        stage0entry =new Date().getTime();
        console.log(stage0entry);
        alert("Your starting time has been recorded.\nNote- This is an example problem and won't count towards your final score")
        const user = auth.currentUser;
        console.log(user);
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, {
            // s0entrycount: s0entrycnt+1,
            Stage0EntryTime: stage0entry,
            arrs0entry: arrayUnion(stage0entry)
        });
    }
};

returnBtn.addEventListener("click", function(event){
    event.preventDefault();
    stage0Modal.style.display = 'none';
    welcomeModal.style.display = 'block';
});

statsOpen.addEventListener("click", function(event){
    event.preventDefault();
    statsModal.style.display='block';
});
statsClose.addEventListener("click", function(event){
    event.preventDefault();
    statsModal.style.display='none';
});

// FIREBASE BACKEND //

console.log("running login.js")
console.log(auth)

const logInBtn = document.querySelector(".login-btn")
const pwdBtn = document.querySelector(".fpassword-btn")
const logOutBtn = document.querySelector('.log-out');
logOutBtn.style.display = "none";

const submitBtn = document.getElementById("submit-btn");

console.log(logInBtn)


document.getElementById("login-form").addEventListener("submit", (e)=> {
    e.preventDefault()
})
document.getElementById("fpassword-form").addEventListener("submit", (e)=> {
    e.preventDefault()
})
document.getElementById("stage0-form").addEventListener("submit", (e)=> {
    e.preventDefault()
})


onAuthStateChanged(auth, async(user)=> {
    console.log("inside onAuthStateChanged")
    if(user && user.emailVerified){
        logOutBtn.style.display = "block";
        console.log(user)
        welcomeModal.style.display = "block";
        loginModal.style.display = "none";
        navItems.style.display = 'flex';
        getUserData();
        // location.replace("stage0.html")
    }
    else{
        logOutBtn.style.display = "none";
        navItems.style.display = 'none';
    }
})

const getUserData = async()=>{
    try{
        console.log("inside getUserData")
        const user = auth.currentUser;
        console.log(user)
        const docRef = doc(db, 'users', user.uid);
        var userStg0Time = "N/A";
        const docSnap = await getDoc(docRef);
        try{
            var userData = docSnap.data();
            var userName = userData.name;
            var userInstitute = userData.institute;
            var userEmail = userData.email;
            var userStg0Time = userData.Stage0Time;
            var s0entrytime = userData.arrs0entry[0];
            console.log(userData.name)
            document.getElementById('user-name').innerHTML = userName;
            document.getElementById('user-email').innerHTML = userEmail;
            document.getElementById('user-institute').innerHTML = userInstitute;
            document.getElementById('user-stage0-time').innerHTML = userStg0Time;
        }
        catch(e){
            alert(e);
        }  
    }
    catch(error){
        alert(error)
    }
}



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
            alert("You have been Logged In.\nPlease refresh the page if you are not redirected");
        }
    })
    .catch((error=>{
        console.log(error)
        alert(error)
    }))
}

const pwdBtnClicked = async()=>{
    var resetEmail = document.getElementById("reset-email").value;
    
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

const submitBtnClicked= async()=>{
    var ans0 = document.getElementById('answer0');
    ans0=ans0.value;
    console.log("submitBtnClicked")
    // console.log(ans0)
    if((ans0=="blackhole") || (ans0=="blackholes")){
        // console.log("inside answer")
        var stage0exit=new Date().getTime();
        console.log(stage0exit);
        const user = auth.currentUser;
        console.log(user);
        const docRef = doc(db, 'users', user.uid);
        var stage0time = (stage0exit-stage0entry)/60000;
        stage0time=Math.round(stage0time*1000)/1000;
        await updateDoc(docRef, {
            Stage0SubmitTime: Date.now(),
            Stage0Time: stage0time
        });
        alert("Correct Answer. \nTime Taken for Stage 0-"+ stage0time +" minutes" +"\nRedirecting to Round-1.")
        location.replace("r1.html")
    }
    else{
        alert("Your answer is incorrect.\nPlease try again, make sure you are following the guidelines for answering.")
    }
}

logInBtn.addEventListener("click", logInClicked)
pwdBtn.addEventListener("click", pwdBtnClicked)
logOutBtn.addEventListener("click", logOutClicked)
submitBtn.addEventListener("click", submitBtnClicked)
stage0Btn.addEventListener("click", stage0BtnClicked)



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