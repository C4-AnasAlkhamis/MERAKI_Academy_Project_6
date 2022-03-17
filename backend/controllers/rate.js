const connection = require("../database/db");

const getRateByVideoId = (req, res) => {
  const Video_id = req.params.id;
  const query = `SELECT id, SUM(CASE WHEN rate = 0 THEN 1 ELSE 0 END ) AS dislikes ,SUM(CASE WHEN rate = 1 THEN 1 ELSE 0 END) AS likes FROM rates WHERE Video_id = ?`;
  const data = [Video_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
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

  const query = `UPDATE rates SET  rate = ? WHERE video_id = ? AND user_id = ?;`;
  const data = [rate, video_id, user_id];
  connection.query(query, data, (err, result) => {
    if (result.affectedRows) {
      return res.status(201).json({
        success: true,
        message: `rate updated`,
        result: result,
      });
    } else {
      const query = `INSERT INTO rates (rate, video_id, user_id ) VALUE (?,?,?)`;
      connection.query(query, data, (err1, result1) => {
        if (err1) {
          return res.status(500).json({
            success: false,
            message: `Server Error`,
          });
        }
        return res.status(201).json({
          success: true,
          message: `rate created`,
          result: result1,
        });
      });
    }
  });
};

module.exports = {
  createNewRate,
  getRateByVideoId,
};
