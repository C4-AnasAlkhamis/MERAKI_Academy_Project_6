const express = require("express");
const { createNewVideo, getAllVideos } = require("../controllers/video");
const videoRouter = express.Router();
const { authentication } = require("../middleware/authentication");

// -------------------------
videoRouter.post("/", authentication, createNewVideo);
videoRouter.get("/", authentication, getAllVideos);

// -------------------------
module.exports = videoRouter;
