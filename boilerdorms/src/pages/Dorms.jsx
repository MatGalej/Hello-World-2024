import React, { useState, useEffect } from 'react';
import './../index.css';
import Navbar from './../components/NavBar';
import { db } from './../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Sidebar from '../components/DormSideBar';
import ReviewForm from '../components/ReviewForm';
import ReviewBox from '../components/ReviewBox';
import MapComponent from '../components/MapComponent';

const DormsPage = () => {
  const [reviewList, setReviewList] = useState([]);
  const [dormSelection, setDormSelection] = useState("Cary Quadrangle");
  const [updateTrigger, setUpdateTrigger] = useState(1);


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
  }, [updateTrigger]);

  useEffect(() => {
    console.log(dormSelection);
  }, [dormSelection]);

  const handleLinkClick = (link) => {
    setDormSelection(link);
    console.log(reviewList.length);
  };

  const updateReviews = () =>{
    setUpdateTrigger(updateTrigger*-1);
  }

  const calculateAverageRating = (dorm) => {
    const filteredReviews = reviewList.filter(review => review.dorm_name === dorm);

    if (filteredReviews.length === 0) {
      return 0;
    }

    const totalRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / filteredReviews.length).toFixed(2);
  };

  console.log(calculateAverageRating("McCutcheon"));

  return (
    <>
      <header className="header-dorms">
        <div className='back-button-container'>
          <a href='/'>
            <button className='back-button'>Go Back</button>
          </a>
        </div>
        <div className='selected-dorm'>
          <h2>Selected Dorm: {dormSelection}</h2>	
        </div>
      </header>
      <div style={{ display: 'flex', gap: '20px', }}> {/* Adjusted gap to separate sidebar and content */}
        <Sidebar onLinkClick={handleLinkClick} />
        <div className="reviews-container" style={{ display: 'flex', flexDirection: 'column', padding: '10px', flexGrow: 1 }}>
          <MapComponent />
            <ReviewForm /> 
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginTop: 0 }}> {/* Control review spacing */}
            {reviewList.length > 0 ? (
              reviewList.filter(review => review.dorm_name === dormSelection).map(review => (
                <ReviewBox
                  key={review.id}
                  rating={review.rating}
                  review={review.text}
                  grade={review.dorm_name} // Explicitly remove margin from each ReviewBox
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
