const express = require("express");
const {
  createNewVideo,
  getAllVideos,
  getFilteredVideo,
  getVideoById,
  updateVideosById,
  updateAllVideos
} = require("../controllers/video");
const videoRouter = express.Router();
const { authentication } = require("../middleware/authentication");

// -------------------------
videoRouter.post("/", authentication, createNewVideo);
videoRouter.get("/", getAllVideos);
videoRouter.get("/:id", getVideoById);
videoRouter.post("/search", getFilteredVideo);
videoRouter.put("/", authentication, updateVideosById);
videoRouter.put("/all", authentication, updateAllVideos);


// -------------------------
module.exports = videoRouter;
