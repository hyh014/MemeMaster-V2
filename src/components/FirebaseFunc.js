import * as firebase from 'firebase';
import React, { Component} from 'react';
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
  }
  convertSnapshot(snapshot){
    let memeObject = snapshot.val();
    memeObject = Object.keys(memeObject).map(key => ({
      ...memeObject[key],
      uid:key
    }));
    return memeObject;
  }
  componentDidMount(){
    initialize();
    let database = firebase.database();
    let temp = this;
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        database.ref('user/'+user.uid).once('value').then(function(snapshot){
          memeObject = convertSnapshot(snapshot);
          temp.setState({
            memes:memeObject
          })

        });
        database.ref('user/'+user.uid).on('child-added',function(snapshot){
          let newChild = snapshot.val();
          let previous = temp.state.memes;
          let newList = [];
          newChild = convertSnapshot(snapshot);
          newList = newChild + previous;
          newList.reverse();
          temp.setState({
            memes:newList
          });
        });

      }
    });

  }

  removeMeme(uid){

    let c = confirm("Do You Want To Delete This Meme?");
    if(c){
      this.setState({
        memes:this.state.memes.filter( (meme) => meme.uid != uid)
      });
    }
  }

  render(){
    return (
      <div>
        {this.state.memes.map((item,i) => (
          <div key={item.uid}>
            <img src={item.meme}/>
            <Button bsStyle='primary' id='download' >Download Meme</Button>
            <Button bsStyle='warning' id='delete' onClick={this.removeMeme(item.uid)}>Delete Meme</Button>
          </div>
        ))}
      </div>

    );
  }
}
