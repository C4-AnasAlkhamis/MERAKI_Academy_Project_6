const express = require("express");
const { register } = require("../controllers/register");
const userRouter = express.Router();
// -------------------------
userRouter.post("/", register);
// -------------------------

module.exports = userRouter;
