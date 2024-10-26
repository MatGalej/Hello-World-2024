import React, { useState } from 'react';

const Sidebar = ({ onLinkClick }) => {
  const [activeIndex, setActiveIndex] = useState(null);

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
    'Owen',
    'Shreve',
    'Wiley',
  ];

  const handleLinkClick = (index, dormName) => {
    setActiveIndex(index);
    onLinkClick(dormName); // Pass the dorm name to the parent
  };

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {dorms.map((dorm, index) => (
        <li key={index} style={{ margin: '5px 0' }}>
          <button
            onClick={() => handleLinkClick(index, dorm)}
            style={{
              width: '200px',
              backgroundColor: activeIndex === index ? 'lightblue' : 'white',
              border: '1px solid #ccc',
              padding: '10px',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'background-color 0.3s',
            }}
          >
            {dorm}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
