import React from 'react';
import './../index.css';
import StarRating from './star'; // Make sure the path is correct

function ReviewBox({ rating, review, grade }) {
  return (
    <div className="review-box">
      <style jsx>{`
        .review-box {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          margin: 16px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          background-color: #f9f9f9;
        }
        
        .review-box-title {
          font-size: 24px;
          margin-bottom: 8px;
          color: #333;
        }
        
        .star-rating-component {
          margin-bottom: 8px;
        }
        
        .review-box-text {
          font-size: 16px;
          color: #555;
        }
      `}</style>
      
      <h2 className="review-box-title">Purdue {grade}</h2>
      <div className="star-rating-component">
        <StarRating rating={rating} />
      </div>
      <p className="review-box-text">{review}</p>
    </div>
  );
}

export default ReviewBox;
