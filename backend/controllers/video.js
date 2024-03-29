const connection = require("../database/db");

// This function to register(new user) .
const createNewVideo = async (req, res) => {
  const user_id = req.token.userId;

  const { user_name, channel_id, title, description, image, video ,dt} = req.body;
  const query = `INSERT INTO videos (user_name, user_id, channel_id, title, description, image, video, dt ) VALUES (?,?,?,?,?,?,?,?)`;
  const data = [
    user_name,
    user_id,
    channel_id,
    title,
    description,
    image,
    video,
    dt,
  ];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "server Error",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      message: "Success video Added",
      result: result,
    });
  });
};

// ================================== //

// This function get all videos from videos
const getAllVideos = (req, res) => {
  const query = `SELECT * FROM videos  WHERE is_deleted = 0  ORDER BY dt DESC`;
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
      result: result,
    });
  });
};
// ================================== //

// This function get all videos from videos
const getVideoById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM videos WHERE id = ?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(200).json({
      success: true,
      message: `video with id ${id}`,
      result: result,
    });
  });
};
// ================================== //
// This function get all videos like value
const getFilteredVideo = (req, res) => {
  const { value } = req.body;
  const query = `SELECT * FROM videos WHERE title LIKE ? AND is_deleted = 0 ORDER BY dt DESC;`;
  const data = [value];
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
      message: `all the videos`,
      result: result,
    });
  });
};

// ================================== //
// This function update on is_deleted video By Id
const deleteVideoById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE videos SET is_deleted = 1 WHERE videos.id = ?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` Server Error`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to update is_deleted video with id ${id}`,
      result: result,
    });
  });
};

// ================================== //
// This function to update video by id.
const updateVideosById = (req, res) => {
  const id = req.params.id;
  const { title, description, list_id } = req.body;
  const query = `UPDATE videos SET title= IF(${
    title != ""
  }, ?, title), description=IF(${
    description != ""
  }, ?, description), list_id=IF(${list_id != ""}, ?, list_id) WHERE id=?;`;

  const data = [title, description, list_id, id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (results.changedRows == 0) {
      return res.status(404).json({
        success: false,
        massage: `The video : ${id} is not found`,
        err: err,
      });
    }

    res.status(201).json({
      success: true,
      massage: `the video updated`,
      result: results,
    });
  });
};
// ================================== //
// this function update all videos image by userId
const updateAllVideos = (req, res) => {
  const { image } = req.body;
  const user_id = req.token.userId;

  const query = `UPDATE videos SET image = ? WHERE user_id = ?;`;

  const data = [image, user_id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `the videos updated`,
      result: results,
    });
  });
};
module.exports = {
  createNewVideo,
  getAllVideos,
  getFilteredVideo,
  deleteVideoById,
  updateVideosById,
  getVideoById,
  updateAllVideos,
};
