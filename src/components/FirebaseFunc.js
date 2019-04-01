import * as firebase from 'firebase';
require('firebase/auth')

export function initialize() {
  if (firebase.apps.length === 0) {
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
export function createUser(email, password) {

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {

    window.location.replace("/meme");
  }).catch(function(error) {

    let errorCode = error.code;
    let errorMessage = error.message;
    alert(errorMessage);

  });
}

//Function that allows the user to log in
export function LogIn(email, password) {

  firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    window.location.replace("/meme");
  }).catch(function(error) {

    let errorCode = error.code;
    let errorMessage = error.message;

    alert(errorMessage);

  });
}

export function uploadMeme(original, meme){
  let currentDate = new Date();
  let date = currentDate.getDate() +'/'
            +(currentDate.getMonth()+1)+'/'
            +currentDate.getFullYear()+'@'
            +currentDate.getHours()+':'
            +currentDate.getMinutes();
  let memeObject = {
    original:original,
    meme:meme,
    date:date
  }
  let database = firebase.database();
  let user = firebase.auth().currentUser;
  database.ref('user/'+user.uid).push(memeObject);
  console.log(user.uid);
}
