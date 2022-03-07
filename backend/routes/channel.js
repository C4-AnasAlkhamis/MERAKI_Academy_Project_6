const express = require("express");

const channelRouter = express.Router();

const { authentication } = require("../middleware/authentication");
const { createNewChannel } = require("../controllers/channel");

//   ===========================

channelRouter.post("/", authentication, createNewChannel);

//   ===========================

module.exports = channelRouter;
