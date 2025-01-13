import Navbar from './navbar';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import CheckboxSeries from './CheckboxSeries';

function Graph() {
  const [strain, setStrain] = useState('');
  const [csv, setCsv] = useState(null);
  const [csvFiles, setCsvFiles] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [variablesSet, setVariablesSet] = useState(false);

  const xOptions = ['Leaves_Lawn', 'Total_Distance', 'Average_Speed', 'Strain', 'Average_Speed_Before_Shock', 'Average_Speed_During_Shock','Average_Speed_After_Shock'];
  const yOptions = ['Leaves_Lawn', 'Total_Distance', 'Average_Speed', 'Strain', 'Average_Speed_Before_Shock', 'Average_Speed_During_Shock','Average_Speed_After_Shock'];

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
  
  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    setCsv(file);
    const files = event.target.files;
    setCsvFiles(files);
  }
  const uploadData = async () => {
    
    if (!csvFiles || csvFiles.length === 0) {
      console.log('No CSV files selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('xdata', selectedX)
    formData.append('ydata', selectedY)
    // Append each CSV file to FormData
    for (let i = 0; i < csvFiles.length; i++) {
      formData.append('csv', csvFiles[i], csvFiles[i].name);
    }
  
    try {
      console.log('FormData contents:', Array.from(formData.entries())); // Log FormData contents
      const response = await fetch('https://barrett-api.onrender.com/graph', {
        method: 'POST',
        body: formData,
      });
      if (response.status === 200) {
        alert('Files uploaded successfully');
        console.log('FormData successfully sent:', Array.from(formData.entries()));
        const blob = await response.blob();

        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'error_bars.png'; // Set the filename

        // Programmatically trigger the click event
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }
  useEffect(() => {
    if (csvFiles && selectedX && selectedY && csvFiles.length > 0 && selectedX.length > 0 && selectedY.length > 0) {
      setVariablesSet(true);
      console.log('all set')
    }
    else{
      setVariablesSet(false);
    }
  }, [csvFiles, selectedX, selectedY]);
  
  

  return (
    <div>
      <div><Navbar /></div>
      <div className='regression=input'>
        <label htmlFor="csvInput" className='upload_csv'>Upload CSV Files:</label>
        <input className='upload_csv' type="file" id="csvInput" accept=".csv" multiple onChange={handleCsvUpload} />
      <div>
        <h3 className='checkbox_head'>X Variables</h3>
        {xOptions.map((x) => (
          <label key={x} className='checkbox'>
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
          <label key={y} className='checkbox'>
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
      <button onClick={uploadData} className={variablesSet ? 'regression-upload-green' : 'regression-upload-red'}>Create</button>
      {isSpinning && <div>Uploading...</div>}
    </div>
  );
}

export default Graph;
