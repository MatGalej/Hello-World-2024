import React, { useState } from 'react';

const StarRating = ({ maxRating = 5, defaultRating = 0 }) => {
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleHover = (value) => {
    setHoverRating(value);
  };

  return (
    <div>
      {[...Array(maxRating)].map((_, index) => (
        <span 
          key={index}
          onClick={() => handleRating(index + 1)}
          onMouseEnter={() => handleHover(index + 1)}
          onMouseLeave={() => handleHover(0)}
          style={{ cursor: 'pointer', color: index < (hoverRating || rating) ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;