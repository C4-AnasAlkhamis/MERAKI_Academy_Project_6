const connection = require("../database/db");
const { cloudinary } = require("./uploadVideo");
// ================================================ //

// This function to register(new user) .
const createNewVideo = async (req, res) => {
  const user_id = req.token.userId;

  const { user_name, channel_id, title, description, image, video } = req.body;

  const query = `INSERT INTO videos (user_name,user_id, channel_id, title, description, image, video ) VALUES (?,?,?,?,?,?,?)`;
  const data = [
    user_name,
    user_id,
    channel_id,
    title,
    description,
    image,
    video,
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
// ================================================
const uploadVideo = async (req, res) => {
  try {
    const { video } = req.body;
    console.log(video);
    const res = await cloudinary.uploader.upload(video, {
      upload_preset: "how-to-tube",
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
  // const formData = new FormData();

  // formData.append("file", video);
  // formData.append("upload_preset", "rwnvwutb");
  // axios
  //   .post(`https://api.cloudinary.com/v1_1/debtpixx1/image/upload/`, formData)
  //   .then((res) => {
  //     // updateWorkerById(res.data.secure_url);
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

module.exports = {
  createNewVideo,
  getAllVideos,
  uploadVideo,
};
