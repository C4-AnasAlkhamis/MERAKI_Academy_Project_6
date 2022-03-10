import axios from "axios";
import React, { useState } from "react";
import "./addVideo.css";
import { useSelector, useDispatch } from "react-redux";

const AddVideo = () => {
  const [channel_id, setChannel_id] = useState(1);
  const [file, setFile] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState(0);
  const { isLoggedIn, token, videos, user_name } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      user_name: state.loginReducer.name,
    };
  });
  // ------------------------------
  const uploadVideo = async (video) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/video`,
        { user_name, channel_id, title, description, image, video },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error.response);
    }
  };
  // ------------------------------

  const uploadCloud = async (e) => {
    e.preventDefault();
    if (!file) {
      uploadVideo(videoUrl);
    } else {
      const option = {
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          let PercentageMath = Math.floor((loaded * 100) / total);
          setPercentage(PercentageMath);
        },
      };
      const formData = new FormData();

      formData.append("file", videoUrl);
      formData.append("upload_preset", "fzupywns");
      axios
        .post(
          `https://api.cloudinary.com/v1_1/how-to-tube/upload`,
          formData,
          option
        )
        .then((res) => {
          console.log(res);
          uploadVideo(res.data.secure_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log(percentage);
  return (
    <>
      <div className="input-group mb-3">
        {/* <div className="input-group mb-2">
          <img src={logo} alt="logo" />
        </div> */}
        <form
          className="row g-3"
          onSubmit={(e) => {
            uploadCloud(e);
          }}
        >
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control"
            required
            autoComplete="off"
            value={title}
            type="text"
            placeholder="title"
          />

          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="form-control"
            required
            autoComplete="off"
            value={description}
            type="text"
            placeholder="description"
          />
          <input
            onChange={(e) => {
              setVideoUrl(e.target.value);
            }}
            // required
            className="form-control"
            autoComplete="off"
            value={videoUrl}
            type="text"
            placeholder="youtube link"
          />
          <label className="form-label" htmlFor="image">
            video
          </label>

          <input
            onChange={(e) => {
              setVideoUrl(e.target.files[0]);
              setFile(!file);
            }}
            className="form-control"
            // required
            autoComplete="off"
            type="file"
            placeholder="video"
            name="video"
          />
          {/* <label className="form-label" htmlFor="image">
            image
          </label>
          <input
            onChange={(e) => {
              uploadImage(e.target.files[0]);

              // setImage(e.target.files[0]);
            }}
            className="form-control"
            // required
            autoComplete="off"
            // value={video}
            type="file"
            placeholder="image"
            name="image"
          /> */}
          <button type="submit" class="btn btn-primary">
            upload
          </button>
        </form>
      </div>
    </>
  );
};

export default AddVideo;
