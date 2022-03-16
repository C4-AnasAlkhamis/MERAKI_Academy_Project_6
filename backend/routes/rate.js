const express = require("express");

const rateRouter = express.Router();

const { authentication } = require("../middleware/authentication");

const { createNewRate, getRateByVideoId } = require("../controllers/rate");

//   ===========================

rateRouter.post("/", authentication, createNewRate);
rateRouter.get("/:id", authentication, getRateByVideoId);
// rateRouter.put("/", authentication, getRateByVideoId);

//   ===========================

module.exports = rateRouter;
