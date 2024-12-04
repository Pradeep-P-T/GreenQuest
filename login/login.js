// Firebase imports and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4ZGrxBRyOHwOCVjBO0D1aIQBCl-O7uEI",
    authDomain: "webwars-2024.firebaseapp.com",
    projectId: "webwars-2024",
    storageBucket: "webwars-2024.firebasestorage.app",
    messagingSenderId: "800212364122",
    appId: "1:800212364122:web:936f8501894e8551da2163",
    measurementId: "G-F5RJ0YER5K"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// User login
document.getElementById('loginBtn').addEventListener('click', loginUser);
document.getElementById('createCollectionBtn').addEventListener('click', registerUser);

// Add Enter key functionality
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab.id === 'loginContent') {
            loginUser(event);
        } else if (activeTab.id === 'registerContent') {
            registerUser(event);
        }
    }
});

async function loginUser(evt) {
    evt.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        display_message("Login Successful!!", "signin_message");
        const user = userCredential.user;
        
        window.location.href = "../home1/home.html";
        
        
    })
    .catch((error) => {
        console.error('Error logging in: ', error);
        alert('Error logging in.');
    });
}

async function registerUser(evt) {
    evt.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;

    if (!validateEmail(email)) {
        alert('Invalid email address.');
        return;
    }

    if (!validatePhone(phone)) {
        alert('Invalid phone number.');
        return;
    }

    if (!validateCity(city)) {
        alert('Invalid City');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;


        const userData = {
            name: name,
            email: email,
            phone: phone,
            city: city,
            createdAt: new Date()
        };
        
        await setDoc(doc(db, "Users", user.uid), userData);

        alert("User registered successfully!");
        document.getElementById('loginTab').click();
    } catch (error) {
        console.error('Error registering user: ', error);
        if (error.code === 'auth/email-already-in-use') {
            display_message("Email address already exists", "signup_message");
        } else {
            display_message('Error registering user.', "signup_message");
        }
    }
}

// Tab switching
document.getElementById('loginTab').addEventListener('click', function() {
    document.getElementById('loginContent').classList.add('active');
    document.getElementById('registerContent').classList.remove('active');
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('registerTab').classList.remove('active');
});

document.getElementById('registerTab').addEventListener('click', function() {
    console.log("coming00");
    document.getElementById('loginContent').classList.remove('active');
    document.getElementById('registerContent').classList.add('active');
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('registerTab').classList.add('active');
});

// Function to validate email
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function to validate phone number
function validatePhone(phone) {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
}

// 
function validateCity(city) {
    // Regular expression to allow letters, spaces, hyphens, and apostrophes.
    const cityPattern = /^[a-zA-Z\s'-]+$/;
    return cityPattern.test(city);
}


// Redirect to home page
document.getElementById('homeBtnLogin').addEventListener('click', function() {
    window.location.href = '../home1/home.html';
});

document.getElementById('homeBtnRegister').addEventListener('click', function() {
    window.location.href = '../home1/home.html';
});

// Function to display a message
function display_message(message, divid) {
    var msg_div = document.getElementById(divid);
    msg_div.style.display = 'block';
    msg_div.innerHTML = message;
    msg_div.style.opacity = 1;
    setTimeout(function() {
        msg_div.style.opacity = 0;
    }, 5000);
}
