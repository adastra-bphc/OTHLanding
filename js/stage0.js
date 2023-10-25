document.addEventListener("DOMContentLoaded", function() {
    var thankform = document.querySelector('.thankyou');
    var stageform = document.querySelector('.stage0-modal');
    var stagelink = document.querySelector('.stage a');

    thankform.style.display = 'block';
    stageform.style.display = 'none';

    stagelink.addEventListener('click', function(event) {
             event.preventDefault();
             thankform.style.display = 'none';
             stageform.style.display = 'block';
             //forgotpassword.style.display = 'none';
         });
});
console.log("running stage0.js")
import{ getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
const auth = getAuth();
console.log(auth)

const logOutBtn = document.querySelector('.log-out');
logOutBtn.style.display = "none";
const user = auth.currentUser;
console.log(user)

onAuthStateChanged(auth, (user)=> {
    if(user){
        console.log("inside if:user")
        alert("you are logged in")
        // location.replace("stage0.html")
        logOutBtn.style.display = "block";
    }
    else{
        console.log("inside else: user")
        logOutBtn.style.display = "none";
        alert("Please Log In to continue")
        //location.replace("login.html")
    }
})

logOutBtn.addEventListener("click", signOut(auth))