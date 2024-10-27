import React from 'react';
import './../index.css';
import { useState, useEffect } from 'react';

function FrontPage() {
  return (
    <>
      <div className="background-image"></div>

      <header className='front-header'>
        <a href='/Signup'>
          <button id='Signup'>Sign Up</button>
        </a>
        <a href='/Login'>
          <button id='Signin'>Log In</button>
        </a>
      </header>

      <div className='front-page'>
        <div>
          <h1>Boiler Dorms</h1>
          <p>Discover what Purdue has to say about <br></br><strike>that one dorm</strike>, and all other, normal dorms.</p>
          <div className='dorm-button-container'>
            <a href='/Dorms'>
              <button className='dorm-button'>View Dorms</button>
            </a>
          </div>
        </div>
        <button className='logout-button'>Log Out</button>
      </div>
    </>
  );
}

export default FrontPage;