const connection = require("../database/db");
// ================================================ //

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

// ================================================ //

// This function get all videos from videos
const getAllVideos = (req, res) => {
  const query = `SELECT * FROM videos WHERE is_deleted = 0`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    if (!result) {
      return res.status(200).json({
        success: false,
        message: `No videos Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: `all the videos`,
      items: result,
    });
  });
};

module.exports = {
  createNewVideo,
  getAllVideos,
};
