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
const authorization = require("../middleware/authorization");

// -------------------------

videoRouter.post("/", authentication, authorization("create"), createNewVideo);
videoRouter.get("/", getAllVideos);
videoRouter.get("/:id", getVideoById);
videoRouter.post("/search", getFilteredVideo);

videoRouter.put(
  "/all",
  authentication,
  authorization("update"),
  updateAllVideos
);
videoRouter.put(
  "/:id",
  authentication,
  authorization("update"),
  updateVideosById
);
videoRouter.put(
  "/delete/:id",
  authentication,
  authorization("delete"),
  deleteVideoById
);

// -------------------------
module.exports = videoRouter;
