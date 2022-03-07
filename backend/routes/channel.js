/** @format */

const express = require("express");

const channelRouter = express.Router();

const { authentication } = require("../middleware/authentication");
const { createNewChannel } = require("../controllers/channel");

//   ===========================

cartRouter.post("/", authentication, createNewChannel);

//   ===========================

module.exports = channelRouter;
