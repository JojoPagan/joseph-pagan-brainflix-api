const express = require("express");
const router = express.Router(); // To use router, instantiate it like this
const fs = require("fs");
const uniqid = require("uniqid");


function readVideos() {
    const videosJSON = fs.readFileSync("./data/videos.json");
    const parsedVideos = JSON.parse(videosJSON);
    console.log(parsedVideos);
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
    // Read the file and find the single video whose id matches the requested id
    const videos = readVideos();
    const singleVideo = videos.find((video) => video.id === req.params.videoId);

      // Respond with the single video
  res.json(singleVideo);
});

// POST endpoint to add a video
router.post("/", (req, res) => {
    // Make a new video with a unique ID
    const newVideo = {
      id: uniqid(),
      title: req.body.title,
      channel: req.body.channel,
      image: req.body.image,
    };

    // 1. Read the current videos array
    // 2. Add to the videos array
    // 3. Write the entire new videos array to the file
    const videos = readVideos();
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    // Respond with the video that was created
    res.status(200).json(newVideo);
  });


module.exports = router;