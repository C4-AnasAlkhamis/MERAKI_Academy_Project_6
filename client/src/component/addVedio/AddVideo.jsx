import axios from "axios";
import React, { useState } from "react";
import "./addVideo.css";
import { useSelector, useDispatch } from "react-redux";

const AddVideo = () => {
  const [channel_id, setChannel_id] = useState(1);
  const [list_id, setList_id] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState();
  const [video, setVideo] = useState("");
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState(0);
  const { isLoggedIn, token, videos } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  const uploadVideo = async (video) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/video`,
        { channel_id, list_id, title, description, video },
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

  const uploadCloud = async (e) => {
    e.preventDefault();
    const option = {
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        let PercentageMath = Math.floor((loaded * 100) / total);
        setPercentage(PercentageMath);
      },
    };
    const formData = new FormData();

    formData.append("file", video);
    formData.append("upload_preset", "fzupywns");
    axios
      .post(
        `https://api.cloudinary.com/v1_1/how-to-tube/upload`,
        formData,
        option
      )
      .then((res) => {
        console.log(res);
        // uploadVideo(res.data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(percentage);
  return (
    <>
      <div className="addVideo_container">
        <div className="addVideo">{/* <img src={logo} alt="logo" /> */}</div>
        <form
          onSubmit={(e) => {
            uploadCloud(e);
          }}
        >
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
            autoComplete="off"
            value={title}
            type="text"
            placeholder="title"
          />

          <input
            onChange={(e) => {
              setDescription(e.target.value);
            }}
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
            autoComplete="off"
            value={videoUrl}
            type="text"
            placeholder="youtube link"
          />
          <input
            onChange={(e) => {
              setVideo(e.target.files[0]);
            }}
            // required
            autoComplete="off"
            // value={video}
            type="file"
            placeholder="video"
          />
          <button>upload</button>
        </form>
      </div>
    </>
  );
};

export default AddVideo;
