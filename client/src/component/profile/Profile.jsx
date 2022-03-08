import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import YouTube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
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
      <div className="profile">
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Profile;
