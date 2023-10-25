//IMPORTANT IMPORTS DO NOT TOUCH//
import{ getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, getDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
const db = getFirestore();
const auth = getAuth();
//IMPORTANT IMPORTS DO NOT TOUCH//


var navItems = document.querySelector('.navbar-items');
var statsModal = document.querySelector('.stats-modal');
var statsOpen = document.querySelector('.stats-open');
var statsClose = document.querySelector('.stats-close');
var r1s1Btn = document.querySelector('.r1s1-btn')

statsModal.style.display='none';


statsOpen.addEventListener("click", function(event){
    event.preventDefault();
    statsModal.style.display='block';
});
statsClose.addEventListener("click", function(event){
    event.preventDefault();
    statsModal.style.display='none';
});

// FIREBASE BACKEND //

const logOutBtn = document.querySelector('.log-out');
// logOutBtn.style.display = "none";



onAuthStateChanged(auth, async(user)=> {
    console.log("inside onAuthStateChanged")
    if(user && user.emailVerified){
        getUserData();
        logOutBtn.style.display = "block";
        console.log(user)
        navItems.style.display = 'flex';
        // location.replace("stage0.html")
    }
    else{
        logOutBtn.style.display = "none";
        navItems.style.display = 'none';
        location.replace("login.html")
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

const logOutClicked = async()=>{
    await signOut(auth);
}

logOutBtn.addEventListener("click", logOutClicked);  


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
