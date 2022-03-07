const connection = require("../database/db");
// =================================================== // done

// This function creates new cart
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

module.exports = {
  createNewList,
};
