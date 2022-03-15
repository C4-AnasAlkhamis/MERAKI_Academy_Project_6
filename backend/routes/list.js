const express = require("express");

const listRouter = express.Router();

const { authentication } = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  createNewList,
  getListByUserId,
  getAllVideoByListId,
} = require("../controllers/list");

//   ===========================

listRouter.post("/", authentication, authorization("create"), createNewList);
listRouter.get("/", authentication, getListByUserId);
listRouter.get("/:id", authentication, getAllVideoByListId);

//   ===========================

module.exports = listRouter;
