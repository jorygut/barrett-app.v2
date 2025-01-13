import React, { useState, useEffect } from 'react';
import './index.css';

const CheckboxSeries = ({ xOptions, yOptions }) => {
  const [selectedX, setSelectedX] = useState([]);
  const [selectedY, setSelectedY] = useState([]);

  const handleXChange = (event) => {
    const { value, checked } = event.target;
    setSelectedX((prev) =>
      checked ? [...prev, value] : prev.filter((x) => x !== value)
    );
  };

  const handleYChange = (event) => {
    const { value, checked } = event.target;
    setSelectedY((prev) =>
      checked ? [...prev, value] : prev.filter((y) => y !== value)
    );
  };

  const sendSelectionsToAPI = async () => {
    const data = { selectedX, selectedY };
  
    try {
      const response = await fetch('https://barrett-api.onrender.com/checks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Server response:', result);
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };
  

  useEffect(() => {
    if (selectedX.length > 0 || selectedY.length > 0) {
      sendSelectionsToAPI();
    }
  }, [selectedX, selectedY]);

  return (
    <div>
      <div>
        <h3 className='checkbox_head'>X Variables</h3>
        {xOptions.map((x) => (
          <label key={x}>
            <input
              type="checkbox"
              value={x}
              checked={selectedX.includes(x)}
              onChange={handleXChange}
            />
            {x}
          </label>
        ))}
      </div>
      <div>
        <h3 className='checkbox_head'>Y Variables</h3>
        {yOptions.map((y) => (
          <label key={y}>
            <input
              type="checkbox"
              value={y}
              checked={selectedY.includes(y)}
              onChange={handleYChange}
            />
            {y}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxSeries;
