import React, { useState, useEffect } from 'react';
import './../index.css';
import Navbar from './../components/NavBar';
import { db } from './../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Sidebar from '../components/DormSideBar';
import ReviewForm from '../components/ReviewForm';

const DormsPage = () => {
  const [reviewList, setReviewList] = useState([]);
  const [dormSelection, setDormSelection] = useState("Meredith");

  useEffect(() => {
    const reviewsCollectionRef = collection(db, "Reviews");
    const getReviewList = async () => {
      try {
        const data = await getDocs(reviewsCollectionRef);
        const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id })); 
        setReviewList(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getReviewList();
  }, []);

  useEffect(() => {
    console.log(dormSelection);
  }, [dormSelection]);

  const handleLinkClick = (link) => {
    setDormSelection(link);
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
          <ReviewForm dorm = {String(dormSelection)}></ReviewForm>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(reviewList.length > 0) ? (
              reviewList
                .filter(review => review.dorm_name === dormSelection) 
                .map(review => (
                  <div key={review.id} className="review">
                    <h3>{review.dorm_name}</h3>
                    <p>Rating: {review.rating}</p>
                    <p>{review.text}</p>
                  </div>
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
