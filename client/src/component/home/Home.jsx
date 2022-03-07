import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  console.log(videos);
  return (
    <>
      <div className="container">
        <div className="videos_box">
          <div key={videos[0].id} className="video">
            <video
              width="750"
              height="500"
              controls
              src={videos[0].video}
            ></video>
            <div>
              <span>{videos[0].user_id}</span>
              <span>{videos[0].channel_id}</span>
              <span>{videos[0].title}</span>
              <span>{videos[0].description}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
