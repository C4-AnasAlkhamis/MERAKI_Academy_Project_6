const connection = require("../database/db");

// =================================================== // done
// This function creates new role
const createNewRole = (req, res) => {
  const { role } = req.body;
  const query = `INSERT INTO roles (role) VALUE (?)`;
  const data = [role];

  connection.query(query, data, (err, role) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      message: `Success role created`,
      result: role,
    });
  });
};
//=================================================== // done
// This function creates new Permission
const createNewPermission = (req, res) => {
  const { permission } = req.body;
  const query = `INSERT INTO permissions (permission) VALUE (?)`;
  const data = [permission];

  connection.query(query, data, (err, role) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      message: `Success permission created`,
      result: role,
    });
  });
};
//=================================================== // done
// This function creates new Permission
const createNewRole_permission = (req, res) => {
  const { role, permission } = req.body;
  const query = `INSERT INTO role_permission (role,
      permission) VALUE (?,?)`;
  const data = [role, permission];

  connection.query(query, data, (err, role) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      message: `Success role_permission created`,
      result: role,
    });
  });
};
module.exports = {
  createNewRole,
  createNewPermission,
  createNewRole_permission,
};
