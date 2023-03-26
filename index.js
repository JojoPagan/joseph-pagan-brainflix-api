const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const uniqid = require('uniqid');

// Configuration
require('dotenv').config();
const PORT = process.env.PORT || 8080;


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

// GET /videos
app.get('/videos', (_req, res) => {
  // 1. Read the videos data (and parse it)
  const videosData = readVideos();

  // 2. Strip down the videos data
  const strippedData = videosData.map((video) => {
      return {
          id: video.id,
          title: video.title,
          channel: video.channel,
          image: video.image,
          description: video.description,
          views: video.views,
          likes: video.likes,
          duration: video.duration,
          video: video.video,
          timestamp: video.timestamp,
          comments: video.comments

      }; 
  });

  // GET /videos/:id
app.get('/videos/:id', (req, res) => {
  // 1. Read the videos data (and parse it)
  const videosData = readVideos();

  // 2. Find the video with the specified ID
  const video = videosData.find((video) => video.id === req.params.id);

  // 3. Return a 404 error if the video is not found
  if (!video) {
    res.status(404).send('Video not found');
    return;
  }

  // 4. Respond with the video data
  res.json(video);
});

  // 3. Respond with that data
  res.json(strippedData);
});




// POST /videos
app.post('/videos', (req, res) => {
  // 1. Read the videos data (and parse it)
  const videosData = readVideos();

  // 2. Generate a unique id for the new video
  const newVideoId = uniqid();

  // 3. Create a new video object and add it to the videos array
  const newVideo = {
    id: newVideoId,
    title: req.headers.title,
    channel: 'Bike Riders',
    image: "http://localhost:9001/images/Upload-video-preview.jpg",
    description: req.headers.description,
    views: 230,
    likes: 10,
    duration: "0:45",
    video: "https://www.youtube.com/watch?v=7OkuyqUU180", 
    timestamp: new Date().getTime(),
    comments: [
      {
        "id": "a2b4ccd4-af48-46e9-9e62-b96731dad728",
        "name": "Joseph Pagan",
        "comment": "Wow! amazing video I want to ride a bike ",
        "likes": 2,
        "timestamp": 1620983771000
      },
    ],
  };
  videosData.push(newVideo);

  // 4. Write the updated videos data to the JSON file
  writeVideos(videosData);

  // 5. Respond with the new video object
  res.status(201).json(newVideo);
});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });