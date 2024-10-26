import React, { useState } from 'react';
import StarRating from './star';

const maxRating=5;
const defaultRating=0;

const ReviewForm = () =>{    
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(defaultRating);
    const [hoverRating, setHoverRating] = useState(0);

    const StarRating = (maxRating) => {
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

    return (
        <div>
            <form>
                <label>Write a review</label>
                <div>{StarRating(maxRating)}</div>
                <input placeholder= "Write your review here..." type="text" onChange={(e) => setRating(e.target.value)}>
                </input>
                <input type="submit" onClick={(e) => {console.log(rating)}}></input>
            </form>
        </div>
    );
}



export default ReviewForm;