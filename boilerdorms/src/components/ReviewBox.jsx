import React from 'react';
import './../index.css';
import StarRating from './star'; // Make sure the path is correct

function ReviewBox({ rating, review, grade }) {
  return (
    <div className="review-box">
      <h2 className="review-box-title">Purdue {grade}</h2>
      <div className="star-rating-component">
        <StarRating rating={rating} />
      </div>
      <p className="review-box-text">{review}</p>
    </div>
  );
}

export default ReviewBox;
