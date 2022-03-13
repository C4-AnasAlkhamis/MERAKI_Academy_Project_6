const express = require("express");
const {
  createNewVideo,
  getAllVideos,
  getFilteredVideo,
  getVideoById,
  updateVideosById,
  updateAllVideos,
  deleteVideoById,
} = require("../controllers/video");
const videoRouter = express.Router();
const { authentication } = require("../middleware/authentication");

// -------------------------
videoRouter.post("/", authentication, createNewVideo);
videoRouter.get("/", getAllVideos);
videoRouter.get("/:id", getVideoById);
videoRouter.post("/search", getFilteredVideo);
videoRouter.put("/all", authentication, updateAllVideos);
videoRouter.put("/:id", authentication, updateVideosById);
videoRouter.put("/delete/:id", authentication, deleteVideoById);

// -------------------------
module.exports = videoRouter;
