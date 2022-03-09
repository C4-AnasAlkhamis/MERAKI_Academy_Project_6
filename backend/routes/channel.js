const express = require("express");

const channelRouter = express.Router();

const { authentication } = require("../middleware/authentication");
const {
  createNewChannel,
  getAllVideoByChannelId,
} = require("../controllers/channel");

//   ===========================

channelRouter.post("/", authentication, createNewChannel);
channelRouter.get("/:id", authentication, getAllVideoByChannelId);

//   ===========================

module.exports = channelRouter;
