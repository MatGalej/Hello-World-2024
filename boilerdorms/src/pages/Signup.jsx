import React from 'react';
import './../signup.css';
import { Auth } from './auth';

const Signup = () => {

  return (
    <>
      <div className="background-container">
        <div className="overlay">
          <header>
            <a href='/'>
              <button className='back-button'>Go Back</button>
            </a>
          </header>

          <body>
            <div className='center-overlay'>
              <h1>Please provide the information below to sign up</h1>
              <p><i>Please note: You <b>must</b> use a @purdue.edu email to sign up</i></p>
              <Auth></Auth>
              <a id='redirect' href='/Login'>
                <p>Have an acccount?</p>
              </a>
            </div>
            <div>
            </div>
          </body>
        </div>
      </div>
    </>
  );
};

export default Signup; 