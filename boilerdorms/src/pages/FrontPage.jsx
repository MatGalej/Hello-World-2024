import React from 'react';
import './../index.css';
import Card from '../components/Card.jsx';  // Ensure this imports your Card component
import { useState, useEffect } from 'react';

function FrontPage() {



  
  return (
    <>
      <header className="header">
        <h1>BoilerDorms</h1>
      </header>
      <div className="card-container">
        <Card
          title="Dorms"
          text="View Review of all dorms! [Insert Description]"
          link="/dorms"
        />
        <Card
          title="Page 2"
          text="View Page 2! [Insert Description]"
          link="/page-2"
        />
        <Card
          title="Page 3"
          text="View Page 3! [Insert Description]"
          link="/page-3"
        />
        
      </div>
    </>
  );
}

export default FrontPage;
