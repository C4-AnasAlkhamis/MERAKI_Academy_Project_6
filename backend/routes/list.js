const express = require("express");

const listRouter = express.Router();

const { authentication } = require("../middleware/authentication");
const { createNewList } = require("../controllers/list");

//   ===========================

listRouter.post("/", authentication, createNewList);

//   ===========================

module.exports = listRouter;
