import React from 'react';
import './../index.css';
import Navbar from './../components/NavBar';
import { useState, useEffect } from 'react';

const DormsPage = () => {
  
    return (
    <>
      <header className="header">
      <h1>Dorms</h1>
      </header>
     
      <Navbar
         link1="/" 
         text1="Home" 
         link2="/page-2" 
         text2="Page 2" 
         link3="/page-3" 
         text3="Page 3" 
      />
    </>
    );
  };
  
  export default DormsPage; 