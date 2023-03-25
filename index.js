const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const uniqid = require('uniqid');

// Configuration
require('dotenv').config();
const PORT = process.env.PORT || 9001;


// This middleware implements Cross Origin Resource Sharing (CORS)
app.use(cors());

// This middleware allows us to post JSON in request.body
app.use(express.json());

// This middleware allows us to serve static files from a folder.
app.use(express.static("public"));

// Home route
app.get('/', (_req, res) => {
  const videosData = JSON.parse(fs.readFileSync('./data/videos.json'));

  res.send(videosData); 
});

// Function to read videos
function readVideos() {
  const videosFile = fs.readFileSync('./data/videos.json');
  const videosData = JSON.parse(videosFile);
  return videosData;
}

// Function to write videos
function writeVideos(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync('./data/videos.json', stringifiedData);
}

// GET /videoas
app.get('/videos', (_req, res) => {
  // 1. Read the videos data (and parse it)
  const videosData = readVideos();

  // 2. Strip down the videos data
  const strippedData = videosData.map((video) => {
      return {
          id: video.id,
          title: video.title
      }; 
  });

  // 3. Respond with that data
  res.json(strippedData);
});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });