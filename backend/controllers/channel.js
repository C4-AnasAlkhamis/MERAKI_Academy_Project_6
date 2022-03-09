const connection = require("../database/db");
// =================================================== // done

// This function creates new cart
const createNewChannel = (req, res) => {
  const { title } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO channels (user_id, title) VALUE (?,?)`;
  const data = [user_id, title];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `channel created`,
      result: result,
    });
  });
};
// ================================== //

// This function get all videos from videos
const getAllVideoByChannelId = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM videos WHERE channel_id = ?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
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
      message: `all the videos with channel id ${id}`,
      result: result,
    });
  });
};
module.exports = {
  getAllVideoByChannelId,
  createNewChannel,
};
