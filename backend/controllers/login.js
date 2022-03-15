const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../database/db");

// This function checks user login credentials
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  const query = `SELECT * FROM users WHERE email = ?`;
  const data = [email];
  connection.query(query, data, (err, result1) => {
    if (!result1.length) {
      return res.status(409).json({
        success: false,
        message: `The email not exists`,
      });
    }
    if (err) {
      return res.status(500).json({
        success: false,
        message: `server Error`,
      });
    } else {
      const query = `SELECT * FROM role_permission JOIN permissions ON role_permission.permission = permissions.id WHERE role_permission.role = ?`;
      const data = [result1[0].role_id];
      connection.query(query, data, async (err, result2) => {
        try {
          const valid = await bcrypt.compare(password, result1[0].password);
          if (!valid) {
            return res.status(403).json({
              success: false,
              message: `The password you’ve entered is incorrect`,
            });
          }
          const permissions = result2.map((element) => {
            return element.permission;
          });
          const payload = {
            userId: result1[0].id,
            role: result1[0].role_id,
            permissions: permissions,
          };

          const options = {
            expiresIn: "60m",
          };
          const name = result1[0].user_name;
          const image = result1[0].image;

          const token = await jwt.sign(payload, process.env.SECRET, options);
          return res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            token: token,
            name: name,
            image: image,
          });
        } catch (err) {
          return res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err,
          });
        }
      });
    }
  });
};

module.exports = {
  login,
};
