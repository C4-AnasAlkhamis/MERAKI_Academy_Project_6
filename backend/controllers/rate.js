const connection = require("../database/db");

const getRateByVideoId = (req, res) => {
  const Video_id = req.params.id;
  const query = `SELECT * FROM rates WHERE Video_id = ?`;
  const data = [Video_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(200).json({
      success: true,
      message: `rate with Video_id ${Video_id}`,
      result: result,
    });
  });
};
const createNewRate = (req, res) => {
  const { rate, video_id } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO rates (rate, video_id, user_id ) VALUE (?,?,?)`;
  const data = [rate, video_id, user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    return res.status(201).json({
      success: true,
      message: `rate created`,
      result: result,
    });
  });
};
module.exports = {
  createNewRate,
  getRateByVideoId,
};
