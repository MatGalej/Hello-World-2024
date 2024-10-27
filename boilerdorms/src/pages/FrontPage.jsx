import React from 'react';
import './../index.css';
import Card from '../components/Card.jsx';  // Ensure this imports your Card component
import { useState, useEffect } from 'react';

function FrontPage() {
  return (
    <>
      <header className='front-header'>
        <a href='/Signup'>
          <button id='Signup'>Sign Up</button>
        </a>
        <a href='/Login'>
          <button id='Signin'>Log In</button>
        </a>
      </header>
      
      <div className='front-page'>
        <body>
          <h1>Boiler Dorms</h1>
          <p>Discover what Purdue has to say about <br></br><b>that one dorm,</b> and all other, normal dorms.</p>
          <div className='dorm-button-container'>
            <a href='/Dorms'>
              <button className='dorm-button'>View Dorms</button>
            </a>
          </div>

        </body>
      </div>
      

    </>
  );
}

export default FrontPage;