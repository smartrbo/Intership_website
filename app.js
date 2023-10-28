const sign_in_btn=document.querySelector('#sign-in-button');
const sign_up_btn=document.querySelector('#sign-up-button');
const container = document.querySelector('.container');

sign_up_btn.addEventListener('click',()=>{
    container.classList.add('sign-up-mode');
});

sign_in_btn.addEventListener('click',()=>{
    container.classList.remove('sign-up-mode');
});

const firebaseConfig = {
    apiKey: "AIzaSyCy_tbBkdF3RItQhFBBpRrKxdoAe4OfEKs",
    authDomain: "signup-48243.firebaseapp.com",
    databaseURL: "https://signup-48243-default-rtdb.firebaseio.com",
    projectId: "signup-48243",
    storageBucket: "signup-48243.appspot.com",
    messagingSenderId: "646620661371",
    appId: "1:646620661371:web:3f65e7b8ef2764fa6104de"
  };

  firebase.initializeApp(firebaseConfig);

  var signupDB=firebase.database().ref('signup')

document.getElementById('ContactForm').addEventListener("login",submitForm);

function submitForm(e){
    e.preventDefault();

    var user=getElementVal("user");
    var Email=getElementVal("Email");
    var Password=getElementVal("Password");

    saveMessages(user,Email,Passwor);

    //enable alert
    // document.querySelector('.alert').style.display = "block";
    //remove alert
    // setTimeout(() =>{
    //     document.querySelector('.alert').style.display = "none";
    // }, 3000);
    //reset form
    // document.getElementById('contactForm').reset();
}

const saveMessages=(user,Email,Password) =>{
    var newsignup=signupDB.push();

    newsignup.set({
        user : user,
        Email : Email,
        Password : Password,
    })
};


const getElementVal=(id) =>{
    return document.getElementById(id).value;
};
