import React from 'react';
import './../index.css';
import Navbar from './../components/NavBar';
import { useState, useEffect } from 'react';
const Page2 = () => {
  
    return (
    <>
      <header className="header">
      <h1>Page 2</h1>
      </header>
     
      <Navbar
         link1="/" 
         text1="Home" 
         link2="/dorms" 
         text2="Dorms" 
         link3="/page-3" 
         text3="Page 3" 
      />
    </>
    );
  };
  
  export default Page2; 