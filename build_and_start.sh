#!/bin/bash

# Install dependencies and build the React app
npm install
npm run build

# Navigate to the backend directory and start the Python server
cd api
gunicorn wsgi:app