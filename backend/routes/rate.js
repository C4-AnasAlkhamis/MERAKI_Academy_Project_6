const express = require("express");

const rateRouter = express.Router();

const { authentication } = require("../middleware/authentication");

const { createNewRate } = require("../controllers/rate");

//   ===========================

rateRouter.post("/", authentication, createNewRate);
// listRouter.get("/", authentication);

//   ===========================

module.exports = rateRouter;
