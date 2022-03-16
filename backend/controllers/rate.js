const connection = require("../database/db");

// ================================= //
// This function creates new List
const createNewRate = (req, res) => {
  const { rate, video_id } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO rates (user_id, rate, video_id) VALUE (?,?,?)`;
  const data = [user_id, rate, video_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `rate created`,
      result: result,
    });
  });
};
module.exports = {
  createNewRate,
};
