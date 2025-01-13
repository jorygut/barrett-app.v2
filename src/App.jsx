import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import Navbar from './navbar';
import { FaSpinner } from 'react-icons/fa';
import './index.css'



function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [xmlFile, setXmlFile] = useState(null);
  const [number, setNumber] = useState(0);
  const [imageFile, setImageFile] = useState(null);

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
      const response = await axios.post("https://barrett-api.onrender.com/xml", formData, {
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
    if (!imageFile) {
      console.error("No image selected.");
      return;
    }
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
          a.download = 'results.csv';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
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

  return (
    <div className="App">
      <div className='navbar'>
        <Navbar />
      </div>
      <h1>Welcome</h1>
      <div className='description-track'>
        <h2>TrackMate Analyzer</h2>
        <p1 className='instructions'>The TrackMate Analyzer is designed to take an input file(in .xml format) and detect feed lawns using a grayscale and Hough algorithm,
          calculate the speed of each worm at each frame, calculate the time in seconds, and calculate the change in speed during before, and after a shock.
          It can be used by inputting an xml file outputted by TrackMate, a jpg of any frame of the video recording the worms, and the number of lawns in the video.
          From here, a csv titled "results.csv" should be downloaded to your computer within a few minutes.
        </p1>
      </div>
      <div className='description-regress'>
        <h2>Regression Analysis</h2>
        <p1 className='instructions'>The Regression Analysis page can be used for identifying the relationship between variables outputted from the TrackMate Analyzer file. 
          It works by taking a csv input and creating a new csv containing the worm number, strain, average speed, whether or not it leaves the feed lawn, and
          total distance travelled. From here it will use an OLS regression model to analyze the relationship between the inputted x and y variables. 
          The output will look like a .txt file containing a detailed regression report showing the R-squared, Adj. R-squared, F-statistic, Prob (F-statistic),
          Log-Likelihood, AIC, BIC, Coefficents, Standard Error, T-Values, and P-Values. It can be used by inputting each csv file outputted by the TrackMate Analyzer
          that you would like to regress, the y-variable that you would like to predict, and the x variables that you would like to test. After hitting "Create",
          a .txt file should be downloaded to your computer shortly.
        </p1>
      </div>
      <div className='description-ml'>
        <h2>Track Predictor</h2>
        <p1 className='instructions'>
          The Track Predictor page creates uses machine learning to attempt to predict the tracks of each worm based on previous assays. By training on a dataset of assays,
          it is able use Linear Regression to attempt to predict what the next x and y cordinates will be at each set of cordinates. From here, it will download a graph
          comparing the actual tracks of the worms to the tracks predicted by the model. This can be used to gain insight into possible trends or common behaviors pathes of the worms.
          The features used in the model are the cordinates of all worms except for the one the model is attempting to predict, the the speed changes of the worms, and whether or not the worms
          have left the lawn.
        </p1>
      </div>
      <div className='description-graph'>
        <h2>Graph Creator</h2>
        <p1 className='instructions'>
          The Graph Creator page is designed to take an X and Y cordinate as input, alongside as many csv files as you want from the TrackMate Analyzer page. The page will output a .png containing
          an error bar graph for the chosen variables, using the standard deviation of the Y variable as the error.
        </p1>
      </div>
      <div className='description-pattern'>
        <h2>Pattern Analyzer</h2>
        <p1 className='instructions'>
          The Pattern Analyzer tool can be used to derive major data points from any number of CSV files analyzed using the TrackMate analyzer. These data points include the strain, number of appearances of that strain,
          average speed of that strain, percentage of observations that leave the lawn, average speed change before and after a shock, and the total distance travelled by all observations. This data will be displayed on a table
          and used for any form of statistical analysis.
        </p1>
      </div>
    </div>
  );
}

export default App;
