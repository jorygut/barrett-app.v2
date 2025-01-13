import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from './navbar';

const Analyze = () => {
  const [csvFiles, setCsvFiles] = useState(null);
  const [analysisData, setAnalysisData] = useState([]);
  const [variablesSet, setVariablesSet] = useState(false);

  const handleCsvUpload = (event) => {
    const files = event.target.files;
    setCsvFiles(files);
  };

  const fetchAnalysisData = async () => {
    if (csvFiles) {
      const formData = new FormData();
      Array.from(csvFiles).forEach(file => {
        formData.append('files', file);
      });

      try {
        const response = await fetch('https://barrett-api.onrender.com/analyze', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setAnalysisData(data);
      } catch (error) {
        console.error('Error fetching analysis data:', error);
      }
    }
  };

  useEffect(() => {
    if (csvFiles && csvFiles.length > 0) {
      setVariablesSet(true);
    } else {
      setVariablesSet(false);
    }
    if (csvFiles) {
      fetchAnalysisData();
    }
  }, [csvFiles]);

  useEffect(() => {
    // Add animated class to rows when analysisData changes
    if (analysisData.length > 0) {
      const rows = document.querySelectorAll('.results-table tbody tr');
      rows.forEach((row, index) => {
        setTimeout(() => {
          row.classList.add('animated');
        }, index * 600); // Delay each row's animation by 200ms
      });
    }
  }, [analysisData]);

  return (
    <div>
      <div><Navbar /></div>
      <div className="upload-section">
        <label htmlFor="csvInput" className='upload_csv_analyze'>Upload CSV Files:</label>
        <input
          className='upload_csv_analyze'
          type="file"
          id="csvInput"
          accept=".csv"
          multiple
          onChange={handleCsvUpload}
        />
      </div>
      <div className="results-section">
        {analysisData.length > 0 ? (
          <table className="results-table">
            <thead>
              <tr>
                <th>Strain</th>
                <th>Count</th>
                <th>Average Speed</th>
                <th>Percent Leaves Lawn</th>
                <th>Average Speed Change on Shock</th>
                <th>Average Speed After Shock</th>
                <th>Total Distance</th>
              </tr>
            </thead>
            <tbody>
              {analysisData.map((data, index) => (
                <tr key={index}>
                  <td>{data.strain}</td>
                  <td>{data.count}</td>
                  <td>{data.average_speed.toFixed(2)}</td>
                  <td>{(data.percent_leaves_lawn * 100).toFixed(2)}%</td>
                  <td>{data.average_speed_shock_start.toFixed(2)}%</td>
                  <td>{data.average_speed_shock_end.toFixed(2)}%</td>
                  <td>{data.total_distance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data to display.</p>
        )}
      </div>
    </div>
  );
};

export default Analyze;
