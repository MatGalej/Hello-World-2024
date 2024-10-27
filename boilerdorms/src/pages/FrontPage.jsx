import React, { useState, useEffect } from 'react';
import './../index.css';
import Navbar from './../components/NavBar';
import { db, auth } from './../config/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Sidebar from '../components/DormSideBar';
import ReviewForm from '../components/ReviewForm';
import ReviewBox from '../components/ReviewBox';
import MapComponent from '../components/MapComponent'; 
import {getAuth, onAuthStateChanged } from "firebase/auth";

const Auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
  } else {
    console.log("No user");
  }
})

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
      </div>
    </>
  );
}

export default FrontPage;