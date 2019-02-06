import React, { Component } from 'react';
// import * as firebase from './FirebaseFunc'
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import {Alert, FormGroup, Button} from 'react-bootstrap'
import Register from './Register'
import Login from './Login'
import Meme from './Meme'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/Meme' component={Meme} />
          <Route exact path='/Register' component={Register} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
