import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addVideo.css";
import YouTube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";

const AddVideo = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  return (
    <>
      <div className="addVideo_container">
        <div className="addVideo">{/* <img src={logo} alt="logo" /> */}</div>
        <form>
          <input
            onChange={(e) => {
              //   setUserName(e.target.value);
            }}
            required
            autoComplete="off"
            // value={userName}
            type="text"
            placeholder="title"
          />

          <input
            onChange={(e) => {
              //   setEmail(e.target.value);
            }}
            required
            autoComplete="off"
            // value={email}
            type="text"
            placeholder="description"
          />
          <input
            onChange={(e) => {
              //   setPassword(e.target.value);
            }}
            required
            autoComplete="off"
            // value={password}
            type="text"
            placeholder="youtube link"
          />
          <input
            onChange={(e) => {
              //   setRepeatPassword(e.target.value);
            }}
            required
            autoComplete="off"
            // value={repeatPassword}
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
