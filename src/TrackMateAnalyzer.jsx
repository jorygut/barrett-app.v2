import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import Navbar from './navbar';
import { FaSpinner } from 'react-icons/fa';
import ConfettiExplosion from 'react-confetti-explosion';

function TrackMateAnalyzer() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [xmlFile, setXmlFile] = useState(null);
  const [number, setNumber] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [variablesSet, setVariablesSet] = useState(false);
  const [isExploding, setIsExploding] = React.useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setXmlFile(file);
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  }

  const uploadXmlFile = async () => {
    if (!xmlFile) {
      console.error("No XML file selected.");
      return;
    }

    const formData = new FormData();
    formData.append('file', xmlFile);

    try {
      const response = await axios.post("http://127.0.0.1:8080/api/xml", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Uploaded XML file successfully:", response.data);
    } catch (error) {
      console.error("Error uploading XML file:", error);
    }
  }

  const uploadImageAndNumber = async () => {
    setIsSpinning(true);
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('number', number);
    formData.append('xml_file', xmlFile)
  
    try {
      const response = await axios.post("https://barrett-api.onrender.com/image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        alert('File uploaded successfully');
        
        // Check if the browser supports the `Blob` constructor
        if (window.Blob && window.URL) {
          setIsSpinning(false);
          // Create a URL for the blob response data
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = xmlFile.name + '.csv';
          console.log(xmlFile.name + '.csv')
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);

          setIsExploding(true);
          setTimeout(() => setIsExploding(false), 3000);
        } else {
          console.error('Browser does not support Blob or URL.createObjectURL');
        }
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      console.error("Error uploading image and number:", error);
    }
  }
  useEffect(() => {
    console.log(xmlFile);
    console.log(imageFile);
    console.log(number);
    if (xmlFile && number && imageFile && xmlFile !== null && imageFile !== null && number > 0){
      setVariablesSet(true);
    }
  })

  return (
    <div className="App">
      <div className='navbar'>
        <Navbar />
      </div>
          {isSpinning && (
      <div className="spinner-container spinning">
        <FaSpinner className="spinner" />
      </div>
    )}
      {isExploding && (
        <ConfettiExplosion />
      )}
      <div className="file-input">
        <label htmlFor="xmlInput">Upload XML File:</label>
        <input className='track-input' type="file" id="xmlInput" accept=".xml" onChange={handleFileUpload} />
      </div>
      <div className="file-input">
        <label htmlFor="imageInput">Upload Image File:</label>
        <input className='track-input' type="file" id="imageInput" accept=".jpg" onChange={handleImageUpload} />
      <div>
      <div className='lawn_upload'>
        <label htmlFor="numberInput">Enter Number of Lawns:</label>
        <input className='track-input' type="number" id="numberInput" value={number} onChange={(e) => setNumber(e.target.value)} />
      </div>
        </div>
        <button className={variablesSet ? 'xml_upload-green' : 'xml_upload-red'} onClick={uploadImageAndNumber}>Upload</button>
      </div>
    </div>
  );
}

export default TrackMateAnalyzer;
