import React from 'react';

const StarRating = ({ rating }) => {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <span 
          key={index}
          style={{ color: index < rating ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
