require("dotenv").config();
const bcrypt = require("bcrypt");
const connection = require("../database/db");
const SECRET = process.env.SALT;

// This function to register(new user) .
const register = async (req, res) => {
  const { user_name, email, password, role_id } = req.body;

  const hashingPass = await bcrypt.hash(password, 7);

  const query = `INSERT INTO users (user_name, email, password, role_id) VALUES (?,?,?,?)`;
  const data = [user_name, email, hashingPass, role_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        message: "server Error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      message: "Success user Added",
      results: result,
    });
  });
};

// This function to update user information by user id
const updateUserById = (req, res) => {
  const id = req.token.userId;
  const { user_name, email, image } = req.body;
  const query = `UPDATE users SET user_name =IF(${
    user_name != ""
  }, ?, user_name) , email = IF(${email != ""}, ?, email) , image = IF(${
    image != ""
  }, ?, image) WHERE id = ?;`;
  const data = [user_name, email, image, id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    return res.status(202).json({
      success: true,
      message: `user with id ${id} updated successfully`,
      result: result,
    });
  });
};

module.exports = {
  register,
  updateUserById,
};
