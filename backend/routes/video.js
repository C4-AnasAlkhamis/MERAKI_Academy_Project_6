const express = require("express");
const { createNewVideo } = require("../controllers/video");
const videoRouter = express.Router();
const { authentication } = require("../middleware/authentication");

// -------------------------
videoRouter.post("/", authentication, createNewVideo);
// -------------------------
module.exports = videoRouter;
