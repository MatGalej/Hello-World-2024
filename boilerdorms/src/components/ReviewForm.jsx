import React, { useState } from 'react';
import StarRating from './star';
import { db } from './../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const maxRating=5;
const minRating=1;
const defaultRating=0;
const maxReviewLength=2000;

const ReviewForm = (dorm_name) =>{    
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

    const handleSubmit = async () =>{
        if(review==''){
            alert("Do not leave the review line blank!");
            return;
        }
        if(review.length > maxReviewLength){
            alert("Your review of "+review.length+" characters exceeds the maximum length of "+maxReviewLength+" characters!");
            return;
        }
        if(rating > maxRating || rating < minRating){
            alert("Invalid rating: Make sure your review is between "+minRating+" and "+maxRating+" stars!");
            return;
        }
        
        const {dorm} = dorm_name;

        try{
            var object = {
                id: "placeHolderID",
                dorm_name: dorm,
                rating: rating,
                text: review,
                likes: 0,
                dislikes: 0
            }
            
            const reviewDoc = await addDoc(collection(db,"Reviews"),object);
            setRating(0);
            setReview('');
            document.getElementById("reviewTextField").value = "";

            window.location.reload();

        }catch(error){
            console.log("Error creating review document");
        }
    }

    return (
        <div className='review-div'>
            <label>Write a review</label>
            <div>{StarRating(maxRating)}</div>
            <input id="reviewTextField" name = "review" placeholder= "Write your review here..." type="text" onChange={(e) => setReview(e.target.value)}/>
            <button type="button" onClick={(e)=>{handleSubmit()}}>Submit review</button>
        </div>
    );
}

export default ReviewForm;