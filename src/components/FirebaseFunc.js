import * as firebase from 'firebase';

export function initialize() {
  if(firebase.apps.length === 0){
    var config = {
      apiKey: "AIzaSyAsO5hQ8gV9sC2rt-Qc1VbfLM-l8zNXOhg",
      authDomain: "mememaster-43ac1.firebaseapp.com",
      databaseURL: "https://mememaster-43ac1.firebaseio.com",
      projectId: "mememaster-43ac1",
      storageBucket: "mememaster-43ac1.appspot.com",
      messagingSenderId: "396908932173"
    };
    firebase.initializeApp(config);
  }
}

// function that allows the user to create an account
export function createUser(email,password){

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){

    window.location.replace("/meme");
  }).catch(function(error){

    let errorCode = error.code;
    let errorMessage= error.message;
    let alert = document.getElementById('alert');
    alert.innerHTML = '<strong>'+errorMessage+'</strong>';
    alert.style.visibility = 'visible';

  });
}

//Function that allows the user to log in
export function LogIn(email,password){

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    window.location.replace("/meme");
  }).catch(function(error){

    let errorCode = error.code;
    let errorMessage = error.message;

    let alert = document.getElementById('alert');
    alert.innerHTML = '<strong>'+ errorMessage +'</strong>';
    alert.style.visibility = 'visible';

  });
}
