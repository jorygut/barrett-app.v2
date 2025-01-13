import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './navbar';
import { FaSpinner } from 'react-icons/fa';
import './index.css';

function Ml() {
    const [csvFiles, setCsvFiles] = useState(null);
    const [variableSet, setVariablesSet] = useState(false);

    const handleCsvUpload = (event) => {
        const files = event.target.files;
        setCsvFiles(files);
    };

    const handleSubmit = async () => {
        if (!csvFiles) {
            alert("Please upload a CSV file first.");
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < csvFiles.length; i++) {
            formData.append("model", csvFiles[i]);
        }

        try {
            const response = await axios.post('https://barrett-api.onrender.com/ml', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob' // Important for handling file downloads
            });

            // Create a URL for the file blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'predicted_tracks.png');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    };
    useEffect(() => {
        if (csvFiles){
            setVariablesSet(true);
        }
    })

    return (
        <div className="App">
            <div className='navbar'>
                <Navbar />
            </div>
            <div>
                <label htmlFor="csvInput" className='predict-label'>Upload CSV Files:</label>
                <input
                    className='upload_csv_predict'
                    type="file"
                    id="csvInput"
                    accept=".csv"
                    multiple
                    onChange={handleCsvUpload}
                />
                <button onClick={handleSubmit} className={variableSet ? 'predict-green' : 'predict-red'}>Predict!</button>
            </div>
        </div>
    );
}

export default Ml;
