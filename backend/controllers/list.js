const connection = require("../database/db");
// =================================================== // done

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
// =================================================== // done

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
      message: `list with UserId ${id}`,
      result: result,
    });
  });
};
module.exports = {
  createNewList,
  getListByUserId,
};
