const express = require("express");

const channelRouter = express.Router();

const { authentication } = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  createNewChannel,
  getAllVideoByChannelId,
  getChannelByUserId,
} = require("../controllers/channel");

//   ===========================

channelRouter.post(
  "/",
  authentication,
  authorization("create_channel"),
  createNewChannel
);
channelRouter.get("/my-channel/:id", authentication, getAllVideoByChannelId);
channelRouter.get("/my-channel", authentication, getChannelByUserId);

//   ===========================

module.exports = channelRouter;
