const express = require("express");
const { createNewVideo } = require("../controllers/video");
const videoRouter = express.Router();
// -------------------------
userRouter.post("/", createNewVideo);
// -------------------------
createNewVideo
module.exports = videoRouter;
