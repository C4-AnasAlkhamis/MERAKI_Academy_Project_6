const express = require("express");
const {
  createNewVideo,
  getAllVideos,
  getFilteredVideo,
  getVideoById,
} = require("../controllers/video");
const videoRouter = express.Router();
const { authentication } = require("../middleware/authentication");

// -------------------------
videoRouter.post("/", authentication, createNewVideo);
videoRouter.get("/", getAllVideos);
videoRouter.get("/:id", getVideoById);
videoRouter.post("/search", getFilteredVideo);

// -------------------------
module.exports = videoRouter;
