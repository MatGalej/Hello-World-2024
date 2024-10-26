import React from 'react';
import './../index.css';
import { Link } from 'react-router-dom'; 

function Card({ title, text, link }) {
  return (
    <Link to={link}> 
      <div className="card">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{text}</p>
    </div>
    </Link>

  );
}

export default Card;
