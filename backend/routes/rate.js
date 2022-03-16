const express = require("express");

const rateRouter = express.Router();

const { authentication } = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const { createNewRate } = require("../controllers/rate");

//   ===========================

listRouter.post("/", authentication, authorization("create"), createNewRate);
// listRouter.get("/", authentication);


//   ===========================

module.exports = listRouter;
