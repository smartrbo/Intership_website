const firebaseConfig = {
    apiKey: "AIzaSyB6exuZcJf5OeGxDql9fTPAdzjUB6B7P4k",
    authDomain: "contact-form-f8af1.firebaseapp.com",
    databaseURL: "https://contact-form-f8af1-default-rtdb.firebaseio.com",
    projectId: "contact-form-f8af1",
    storageBucket: "contact-form-f8af1.appspot.com",
    messagingSenderId: "266480194090",
    appId: "1:266480194090:web:0444b790e0ea38e0eda953"
  };
//initalize firebase
  firebase.initializeApp(firebaseConfig);
// reference your data base

var contactformDB=firebase.database().ref('contact-Form')

document.getElementById('contactForm').addEventListener("submit",submitForm);

function submitForm(e){
    e.preventDefault();

    var name=getElementVal("name");
    var email=getElementVal("email");
    var Phone=getElementVal("Phone");
    var city=getElementVal("city");
    var message=getElementVal("message");

    saveMessages(name,email,Phone,city,message);

    //enable alert
    document.querySelector('.alert').style.display = "block";
    //remove alert
    setTimeout(() =>{
        document.querySelector('.alert').style.display = "none";
    }, 3000);
    //reset form
    document.getElementById('contactForm').reset();
}

const saveMessages=(name,email,Phone,city,message) =>{
    var newContactForm=contactformDB.push();

    newContactForm.set({
        name : name,
        email : email,
        Phone : Phone,
        city : city,
        message : message,
    })
};


const getElementVal=(id) =>{
    return document.getElementById(id).value;
};