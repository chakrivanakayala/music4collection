const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";


import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDdSUuEYN2RIEZO5xI9B_901GnKcbv5kjQ",
    authDomain: "all-activities-65946.firebaseapp.com",
    projectId: "all-activities-65946",
    storageBucket: "all-activities-65946.appspot.com",
    messagingSenderId: "882427784321",
    appId: "1:882427784321:web:21bda48cae792e18bbf180",
    measurementId: "G-MVWSPWG453"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);


function showErrorMessage(message) {
    let messageDiv = document.getElementsByClassName('errorMessage')
    messageDiv.innerHTML = message
}


function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showErrorMessage(errorCode)
        });

}

function createAccount(email, password, conformPassword) {

    if (password === conformPassword) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                showErrorMessage(errorCode)
            });
        sendEmailVerification(auth.currentUser).then(
            () => {

                showErrorMessage('sent email verification succefully')
            }
        )
    } else {
        showErrorMessage('password mismatch')
    }

}



document.getElementById('signUpButton').addEventListener('click', () => {


    createAccount(
        document.getElementById('signupEmail').value,
        document.getElementById('signupPassword').value,
        document.getElementById('signupConfirmPassword').value)

})


document.getElementById('signinButton').addEventListener('click', () => {


    signIn(
        document.getElementById('signinEmail').value,
        document.getElementById('signinPassword').value)

})







onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        location.href = './home.html'
            // ...
    } else {
        // User is signed out
        // ...
    }
});