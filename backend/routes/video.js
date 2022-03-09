const express = require("express");
const {
  createNewVideo,
  getAllVideos,
  // uploadVideo,
} = require("../controllers/video");
const videoRouter = express.Router();
const { authentication } = require("../middleware/authentication");

// -------------------------
videoRouter.post("/", authentication, createNewVideo);
videoRouter.get("/", authentication, getAllVideos);
// videoRouter.post("/cloudinary", uploadVideo);

// -------------------------
module.exports = videoRouter;
