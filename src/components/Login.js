import React, { Component } from 'react';
// import * as firebase from './FirebaseFunc'
import {
  BrowserRouter,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import {Alert, FormGroup, FormControl, Form, Col, Button, ControlLabel} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register'
import Meme from './Meme'
import * as Firebase from './FirebaseFunc'

class Login extends Component{
  constructor(props){
    super(props);

    this.state={
      email:'',
      password:'',
    }

    this.handleRegister = this.handleRegister.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }
  authenticate(){
    Firebase.LogIn(this.state.email,this.state.password);
  }
  handleRegister(){
    Firebase.createUser(this.state.email,this.state.password);
  }
  render(){
      return(

        <BrowserRouter>
          <div style={{textAlign:'center'}}>
            <h1 >Log In</h1>
             <Form horizontal>
               <FormGroup controlId="email" bsSize="large">
                 <Col componentClass={ControlLabel} sm={5}>
                   Email
                 </Col>
                 <Col sm={2}>
                   <FormControl type="email" placeholder="Email" value={this.state.email} onChange={this.onChange}/>
                 </Col>
               </FormGroup>

               <FormGroup controlId="password" bsSize="large">
                 <Col componentClass={ControlLabel} sm={5}>
                   Password
                 </Col>
                 <Col sm={2}>
                   <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
                 </Col>
               </FormGroup>
              <Button type='submit' bsSize="large" onClick={()=> this.authenticate}>Log in</Button><br/>
              <Link to='/Register' onClick={this.handleRegister} >Register</Link>
              <Route exact path='/Register' component={Register}/>
              <Route exact path='/Meme' component={Meme} />
             </Form>
            </div>
          </BrowserRouter>
      );

  }
}
 export default Login;
