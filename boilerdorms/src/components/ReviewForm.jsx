import React, { useState } from 'react';
import StarRating from './star';
import { db } from './../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const maxRating=5;
const minRating=1;
const defaultRating=0;
const maxReviewLength=2000;

const ReviewForm = ({dorm_name, updateReviews, grade}) =>{    
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(defaultRating);
    const [hoverRating, setHoverRating] = useState(0);
    const [error, setError] = useState(""); // Error state

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

    const handleSubmit = async () =>{
        setError("");
      
        if(review==''){
            setError("Do not leave the review line blank!");
            return;
        }
        if(review.length > maxReviewLength){
            setError("Your review of "+review.length+" characters exceeds the maximum length of "+maxReviewLength+" characters!");
            return;
        }
        if(rating > maxRating || rating < minRating){
            setError("Invalid rating: Make sure your review is between "+minRating+" and "+maxRating+" stars!");
            return;
        }
        
        try{
            const object = {
                id: "placeHolderID",
                dorm_name: dorm_name,
                rating: rating,
                text: review,
                likes: 0,
                dislikes: 0,
                grade: grade
            }
            setRating(0);
            setReview('');
            const reviewDoc = await addDoc(collection(db,"Reviews"),object);
            document.getElementById("reviewTextField").value = "";
    
            updateReviews();
        }catch(error){
            console.trace("Error creating review document");
        }
    }

    return (
        <div className='review-div'>
            <label>Write a review</label>
            <div className='star-rating'>{StarRating(maxRating)}</div>
            <textarea id="reviewTextField" name = "review" placeholder= "Write your review here..." type="text" onChange={(e) => setReview(e.target.value)}/>
            <button id='submit-review' type="button" onClick={(e)=>{handleSubmit()}}>Submit review</button>
            {error && (
                <div className="error-box">
                    <p>{error}</p>
                </div>
            )}

        </div>
    );
}

export default ReviewForm;