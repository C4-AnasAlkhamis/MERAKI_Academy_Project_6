require("dotenv").config();
const bcrypt = require("bcrypt");
const connection = require("../database/db");
const SECRET = process.env.SALT;

// This function to register(new user) .
const register = async (req, res) => {
  console.log(SECRET);
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

module.exports = {
  register,
};
