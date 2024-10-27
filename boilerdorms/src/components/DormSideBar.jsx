import React, { useState, useEffect } from 'react';
import { db } from './../config/firebase';
import { collection, getDocs } from 'firebase/firestore';


const Sidebar = ({ onLinkClick , updateTrigger}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [reviewList, setReviewList] = useState([]);

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

  const calculateAverageRating = (dorm) => {
    const filteredReviews = reviewList.filter(review => review.dorm_name === dorm);
    
    if (filteredReviews.length === 0) {
      return 0; 
    }
  
    const totalRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / filteredReviews.length).toFixed(1);
  };


  const dorms = [
    'Meredith',
    'Meredith South',
    'Windsor',
    'Cary Quadrangle',
    'McCutcheon',
    'Tarkington',
    'Earhart',
    'First Street Towers',
    'Frieda Parker',
    'Winifred Parker',
    'Harrison',
    'Hawkins',
    'Honors College',
    'Hillenbrand',
    'Owen',
    'Shreve',
    'Wiley',
  ];

  const handleLinkClick = (index, dormName) => {
    setActiveIndex(index);
    onLinkClick(dormName); 
  };

  return (
    <ul className='dorm-options' style={{ listStyleType: 'none', padding: 3 }}>
      {dorms.map((dorm, index) => (
        <li key={index} style={{ margin: '4px .5em' }}>
          <button
            onClick={() => handleLinkClick(index, dorm)}
            style={{
              width: '200px',
              fontFamily: 'Space-Grotesk',
              fontSize: '.9em',
              backgroundColor: activeIndex === index ? 'lightblue' : "#DAAA00" ,
              border: '1px solid #ccc',
              padding: '8px',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'background-color 0.3s',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
            }}
          >
            <span>{dorm}</span>
            <span>{calculateAverageRating(dorm)} / 5</span> 
          </button>
        </li>
      ))}
    </ul>  );
};

export default Sidebar;