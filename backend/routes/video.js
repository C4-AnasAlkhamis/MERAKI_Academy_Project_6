const express = require("express");
const {
  createNewVideo,
  getAllVideos,
  getFilteredVideo,
} = require("../controllers/video");
const videoRouter = express.Router();
const { authentication } = require("../middleware/authentication");

// -------------------------
videoRouter.post("/", authentication, createNewVideo);
videoRouter.get("/", getAllVideos);
videoRouter.post("/search", getFilteredVideo);

// -------------------------
module.exports = videoRouter;
