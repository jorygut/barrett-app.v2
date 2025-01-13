const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve .jsx files with the correct MIME type
app.get('*.jsx', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', req.url));
});

// Serve .svg files with the correct MIME type
app.get('*.svg', (req, res) => {
  res.set('Content-Type', 'image/svg+xml');
  res.sendFile(path.join(__dirname, 'public', req.url));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
