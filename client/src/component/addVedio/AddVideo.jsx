import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addVideo.css";
import YouTube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";

const AddVideo = () => {
  const [channel_id, setChannel_id] = useState(1);
  const [list_id, setList_id] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  const uploadVideo = async (e) => {
    e.preventDefault();
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
  return (
    <>
      <div className="addVideo_container">
        <div className="addVideo">{/* <img src={logo} alt="logo" /> */}</div>
        <form
          onSubmit={(e) => {
            uploadVideo(e);
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
              setVideo(e.target.value);
            }}
            required
            autoComplete="off"
            value={video}
            type="text"
            placeholder="youtube link"
          />
          {/* <input
            onChange={(e) => {
              //   setRepeatPassword(e.target.value);
            }}
            required
            autoComplete="off"
            // value={repeatPassword}
            type="file"
            placeholder="video"
          /> */}
          <button>upload</button>
        </form>
      </div>
    </>
  );
};

export default AddVideo;
