const express = require("express");
const router = express.Router(); // To use router, instantiate it like this
const fs = require("fs");
const uniqid = require("uniqid");


function readVideos() {
    const videosJSON = fs.readFileSync("./data/videos.json");
    const parsedVideos = JSON.parse(videosJSON);
    return parsedVideos;
  }

  router.use((_req, _res, next) => {
    console.log("Middleware from videos router");
    next();
  });

  // GET endpoint for all videos
router.get("/", (_req, _res) => {
    // Respond with the videos data from our file
    _res.json(readVideos());
  });
  
  // GET endpoint for an invididual video
router.get("/:videoId", (req, res) => {
    // Read the file and find the single note whose id matches the requested id
    const notes = readVideos();
    const singleNote = videos.find((video) => video.id === req.params.videoId);

      // Respond with the single video
  res.json(singleNote);
});

// POST endpoint to add a video
router.post("/", (req, res) => {
    // Make a new video with a unique ID
    const newVideo = {
      id: uniqid(),
      title: req.body.title,
      content: req.body.content,
    };

    // 1. Read the current notes array
    // 2. Add to the notes array
    // 3. Write the entire new notes array to the file
    const videos = readVideos();
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    // Respond with the video that was created
    res.status(200).json(newVideo);
  });


module.exports = router;