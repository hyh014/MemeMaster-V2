import * as firebase from 'firebase';
import React, { Component} from 'react';
import {Button} from 'react-bootstrap';
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
  firebase.auth().onAuthStateChanged(function(user){
    if(user){

      database.ref('user/'+user.uid).push(memeObject);
    }
  });

}

export class MemeList extends Component{
  constructor(props){
    super(props);
    this.state = {
      memes: []
    }
    this.removeMeme = this.removeMeme.bind(this);
    this.downloadMeme = this.downloadMeme.bind(this);
  }

  componentDidMount(){
    initialize();
    let database = firebase.database();
    let temp = this;
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        database.ref('user/'+user.uid).once('value').then(function(snapshot){
          let memeObject = snapshot.val();
          memeObject = Object.keys(memeObject).map(key => ({
            ...memeObject[key],
            uid:key
          }));
          temp.setState({
            memes:memeObject
          })

        });
        database.ref('user/'+user.uid).orderByKey().limitToLast(1).on('child-added',function(snapshot){
          let previous = temp.state.memes;
          let newList = [];
          let newChild = snapshot.val();
          console.log('added');
          newChild = Object.keys(newChild).map(key => ({
            ...newChild[key],
            uid:key
          }));
          newList = newChild + previous;
          newList.reverse();
          temp.setState({
            memes:newList
          });
        });

      }
    });

  }
  downloadMeme(uid){
    console.log(uid);
    let meme = this.state.memes.filter((meme) => meme.uid == uid);
    console.log(meme[0]);
    const a = document.createElement('a');
    a.download = "meme.png";
    a.href = meme[0].meme;
    console.log(meme.meme);
    document.body.appendChild(a);
    a.click();
  }
  removeMeme(uid){
    let database = firebase.database();
    let c = window.confirm("Do You Want To Delete This Meme?");
    if(c){
      this.setState({
        memes:this.state.memes.filter( (meme) => meme.uid != uid)
      });
      firebase.auth().onAuthStateChanged(function(user){
        if(user){
      database.ref('user/'+user.uid).child(uid).remove();
      }
    });
  }
}

  render(){
    return (
      <div>
        {this.state.memes.map((item,i) => (
          <div key={item.uid}>
          <div>
            <img src={item.meme}/>
            </div>
            <Button bsStyle='primary' id='download' onClick={(e) => this.downloadMeme(item.uid)}>Download Meme</Button>
            <Button bsStyle='warning' id='delete' onClick={(e) => this.removeMeme(item.uid)}>Delete Meme</Button>
          </div>
        ))}
      </div>

    );
  }
}
