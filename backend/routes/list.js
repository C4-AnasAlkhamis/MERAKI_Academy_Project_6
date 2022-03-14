const express = require("express");

const listRouter = express.Router();

const { authentication } = require("../middleware/authentication");
const { createNewList, getListByUserId } = require("../controllers/list");

//   ===========================

listRouter.post("/", authentication, createNewList);
listRouter.get("/", authentication, getListByUserId);

//   ===========================

module.exports = listRouter;
