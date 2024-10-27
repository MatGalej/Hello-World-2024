import React from 'react';
import './../login.css';
import { LoginAuth } from './loginAuth';

const Login = () => {
  
    return (
    <>
      <div className="background-container-login">
        <div className="overlay-login">
        <header>
            <a href='/'>
              <button className='back-button'>Go Back</button>
            </a>
          </header>

          <body>
            <div className='center-overlay'>
              <h1>Please provide the information below to login</h1>
              <p><i>Please note: You <b>must</b> use a @purdue.edu email to login</i></p>
              <LoginAuth></LoginAuth>
              <a id='redirect' href='/Signup'>
                <p>No Account?</p>
              </a>
            </div>
          </body>

        </div>
      </div>
    </>
    );
  };
  
  export default Login; 