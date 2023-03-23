const express = require("express");
const app = express();
const PORT = 8080;
const videoRoute = require("./routes/video");
const cors = require("cors");

// This middleware implements Cross Origin Resource Sharing (CORS)
app.use(cors());

// This middleware allows us to post JSON in request.body
app.use(express.json());

// This middleware allows us to serve static files from a folder.
app.use(express.static("files"));



app.use("/video", videoRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });