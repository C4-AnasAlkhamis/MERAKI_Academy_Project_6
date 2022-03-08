import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css";
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
  return (
    <>
      <div className="profile">
        <div>
          <div className="profile_info">
            <img src="" alt="" />
            <h3>name</h3>
          </div>
          <div className="profile_navBar">
            {/* <Link></Link>
            <Link></Link>
            <Link></Link>
            <Link></Link> */}
          </div>
        </div>
        <div>
          <div>all videos</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
