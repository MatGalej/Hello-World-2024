import React, { useState, useEffect } from 'react';
import './../index.css';
import Navbar from './../components/NavBar';
import { db, auth } from './../config/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Sidebar from '../components/DormSideBar';
import ReviewForm from '../components/ReviewForm';
import ReviewBox from '../components/ReviewBox';
import MapComponent from '../components/MapComponent';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function FrontPage() {
  const [userVal, setUserVal] = useState(null);
  const [success, SetSuccessLogin] = useState("");

  const Auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserVal(user);
      SetSuccessLogin(true);
    } else {
      console.log("No user");
    }
  })

  const logout = () => {
    if (userVal != null) {
      auth.signOut();
      SetSuccessLogin(false);
      window.location.reload()
    }
  }

  function hideElementAfterDelay(elementId, delay) {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.style.display = "none";
      }
    }, delay);
  }

  return (
    <>
      <div className="background-image"></div>

      <header className='front-header'>
        <div className="user-header">
          <div className='confirmation'>
            {success && (
              <div className='success-box'>
                <p>Logged In Successfully!</p>
              </div>
            )}
          </div>

          <div className='user-buttons'>
            
            {!userVal && (
              <a href='/Signup'>
                <button id='Signup'>Sign Up</button>
              </a>
            )}

            {userVal && (
              <button className='logout-button' onClick={logout}>Log Out</button>
            )}
              
            {!userVal && (
              <a href='/Login'>
                <button id='Signin'>Log In</button>
              </a>
            )}
          </div>
        </div>
      </header>



      <div className='front-page'>
        <h1>Boiler Dorms</h1>
        <p>Discover what Purdue has to say about <br></br><strike>that one dorm</strike>, and all other, normal dorms.</p>
        <div className='dorm-button-container'>
          <a href='/Dorms'>
            <button className='dorm-button'>View Dorms</button>
          </a>
        </div>
      </div>
    </>
  );
}

export default FrontPage;