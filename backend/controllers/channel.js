const connection = require("../database/db");

// ================================= //
// This function creates new channel
const createNewChannel = (req, res) => {
  const { title } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO channels (user_id, title) VALUE (?,?)`;
  const data = [user_id, title];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error1`,
      });
    } else {
      const query1 = `UPDATE users SET role_id = 1 WHERE id = ?`;
      const data1 = [user_id];
      connection.query(query1, data1, (err2, result1) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: `Server Error1`,
          });
        }
        res.status(201).json({
          success: true,
          message: `channel created`,
          result: result,
        });
      });
    }
  });
};

// ================================== //
// This function get all videos from videos by channel_id
const getAllVideoByChannelId = (req, res) => {
  const channel_id = req.params.id;
  const query = `SELECT * FROM videos WHERE  is_deleted = 0 AND channel_id = ? ORDER BY dt DESC`;
  const data = [channel_id];
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
      message: `all the videos with channel id  ${channel_id}`,
      result: result,
    });
  });
};

// ================================== //
// This function get channel by user Id
const getChannelByUserId = (req, res) => {
  const user_id = req.token.userId;
  const query = `SELECT * FROM channels WHERE user_id = ? `;
  const data = [user_id];
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
        message: `No channel Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: ` the channel with user id ${user_id}`,
      result: result,
    });
  });
};
module.exports = {
  getChannelByUserId,
  getAllVideoByChannelId,
  createNewChannel,
};
