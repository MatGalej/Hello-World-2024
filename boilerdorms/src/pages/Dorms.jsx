import React, { useState, useEffect } from 'react';
import './../index.css';
import Navbar from './../components/NavBar';
import { db } from './../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Sidebar from '../components/DormSideBar';
import ReviewForm from '../components/ReviewForm';
import ReviewBox from '../components/ReviewBox';

const DormsPage = () => {
  const [reviewList, setReviewList] = useState(() => {
    // Try to get cached data from local storage
    const cachedData = localStorage.getItem('reviewList');
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [dormSelection, setDormSelection] = useState("Meredith");

  useEffect(() => {
    // Fetch data only if reviewList is empty
    const fetchReviews = async () => {
      if (reviewList.length === 0) {
        const reviewsCollectionRef = collection(db, "Reviews");
        try {
          const data = await getDocs(reviewsCollectionRef);
          const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setReviewList(filteredData);
          localStorage.setItem('reviewList', JSON.stringify(filteredData)); // Cache in local storage
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchReviews();
  }, [reviewList]); // Only fetch if reviewList is empty

  useEffect(() => {
    console.log(dormSelection);
  }, [dormSelection]);

  const handleLinkClick = (link) => {
    setDormSelection(link);
  };

  const calculateAverageRating = (dorm) => {
    const filteredReviews = reviewList.filter(review => review.dorm_name === dorm);
    
    if (filteredReviews.length === 0) {
      return 0; 
    }
  
    const totalRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / filteredReviews.length).toFixed(2);
  };

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
      <div style={{ display: 'flex' }}>
        <Sidebar onLinkClick={handleLinkClick} />
        <div className="reviews-container" style={{ padding: '20px', flexGrow: 1 }}>
          <h2>Selected Dorm: {dormSelection}</h2>
          <ReviewForm />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {reviewList.length > 0 ? (
              reviewList.filter(review => review.dorm_name === dormSelection).map(review => (
                <ReviewBox 
                  key={review.id} 
                  rating={review.rating} 
                  review={review.text} 
                  grade={review.dorm_name} 
                />
              ))
            ) : (
              <div>
                <p>No reviews available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DormsPage;
