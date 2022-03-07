/** @format */

const express = require("express");

const listRouter = express.Router();

const { authentication } = require("../middleware/authentication");
const { createNewList } = require("../controllers/list");

//   ===========================

cartRouter.post("/", authentication, createNewList);

//   ===========================

module.exports = listRouter;
