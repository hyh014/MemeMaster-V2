import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import {Alert, FormGroup, FormControl, Form, Col, Button, ControlLabel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Firebase from './FirebaseFunc';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
    }
  }
  render(){

    return(
      <div>
        <h1>Register</h1>
        <h2>Register</h2>
      </div>
    )
  }
}

export default Register;
