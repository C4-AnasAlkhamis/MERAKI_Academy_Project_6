/** @format */

const express = require("express");

const roleRouter = express.Router();
//dont press enter
//write your code here

const {
  createNewRole,
  createNewPermission,
  createNewRole_permission,
} = require("../controllers/role");
// =========================================== //

roleRouter.post("/", createNewRole);
roleRouter.post("/permissions", createNewPermission);
roleRouter.post("/role-permission", createNewRole_permission);

//write your code here
module.exports = roleRouter;
