const express = require("express");
const { register, updateUserById } = require("../controllers/register");
const userRouter = express.Router();
const { authentication } = require("../middleware/authentication");

// -------------------------
userRouter.post("/", register);
userRouter.put("/", authentication, updateUserById);

// -------------------------

module.exports = userRouter;
