const connection = require("../database/db");

// This function to register(new user) .
const createNewVideo = async (req, res) => {
  const user_id = req.token.userId;

  const { channel_id, list_id, title, description, video } = req.body;

  const query = `INSERT INTO users (user_id, channel_id, list_id, title, description, video ) VALUES (?,?,?,?,?,?)`;
  const data = [user_id, channel_id, list_id, title, description, video];

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
      message: "Success video Added",
      results: result,
    });
  });
};

module.exports = {
  createNewVideo,
};