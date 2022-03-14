const connection = require("../database/db");

// ================================= //
// This function creates new List
const createNewList = (req, res) => {
  const { list } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO lists (user_id, list) VALUE (?,?)`;
  const data = [user_id, list];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `list created`,
      result: result,
    });
  });
};

// =================================== //
// This function get all List with user id
const getListByUserId = (req, res) => {
  const user_id = req.token.userId;
  const query = `SELECT * FROM lists WHERE user_id = ?`;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(200).json({
      success: true,
      message: `list with UserId ${user_id}`,
      result: result,
    });
  });
};
// ================================== //
// This function get all videos from videos by list_id
const getAllVideoByListId = (req, res) => {
  const list_id = req.params.id;
  const query = `SELECT * FROM videos WHERE is_deleted = 0 AND list_id = ?`;
  const data = [list_id];
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
      message: `all the videos with list id  ${list_id}`,
      result: result,
    });
  });
};
module.exports = {
  createNewList,
  getListByUserId,
  getAllVideoByListId,
};
