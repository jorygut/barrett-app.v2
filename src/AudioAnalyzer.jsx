import React, { useState, useEffect } from 'react';
import './index.css';
import axios from "axios";
import Navbar from './navbar';  // Assuming navbar component is in ./navbar

function AudioAnalyzer() {
  const [mp3, setMp3] = useState(null);
  const [results, setResults] = useState(null);

  const handleMp3 = (event) => {
    const file = event.target.files[0];
    setMp3(file);
  }

  const uploadData = async () => {
    try {
      const formData = new FormData();
      formData.append('mp3', mp3);
      const response = await axios.post('https://barrett-api.onrender.com/audio', formData);
      setResults(response.data);  // Assuming response.data is the results dictionary
    } catch (error) {
      alert('File upload failed');
    }
  }

  return (
    <div>
      <Navbar />
      <div>
        <label>Upload Mp3 Here</label>
        <input type='file' accept='.mp3' onChange={handleMp3}></input>
        <button onClick={uploadData}>Analyze</button>
      </div>
      
      {results && (
        <div>
          <h2>Analysis Results</h2>
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(results).map((key, index) => (
                <tr key={index}>
                  <td>{key}</td>
                  <td>{results[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AudioAnalyzer;
