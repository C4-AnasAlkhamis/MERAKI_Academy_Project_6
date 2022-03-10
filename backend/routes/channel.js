const express = require("express");

const channelRouter = express.Router();

const { authentication } = require("../middleware/authentication");
const {
  createNewChannel,
  getAllVideoByChannelId,
  getChannelByUserId
} = require("../controllers/channel");

//   ===========================

channelRouter.post("/", authentication, createNewChannel);
channelRouter.get("/", authentication, getAllVideoByChannelId);
channelRouter.get("/my-channel", authentication, getChannelByUserId);


//   ===========================

module.exports = channelRouter;
