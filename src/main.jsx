import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Navbar from './navbar'
import RegressionAnalysis from './RegressionAnalysis.jsx'
import TrackmateAnalyzer from './TrackMateAnalyzer.jsx'
import Ml from './Ml'
import Graph from './Graph'
import Analyze from './Analyze.jsx'
import AudioAnalyzer from './AudioAnalyzer.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}></Route>
    <Route path="/track" element={<TrackmateAnalyzer />}></Route>
    <Route path="/regress" element={<RegressionAnalysis />}></Route>
    <Route path="/audio" element={<AudioAnalyzer />}></Route>
    <Route path="/ml" element={<Ml />}></Route>
    <Route path="/graph" element={<Graph />}></Route>
    <Route path="/analyze" element={<Analyze />}></Route>
  </Routes>
  </BrowserRouter>,
)
