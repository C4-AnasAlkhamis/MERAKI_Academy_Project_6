import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addVideo.css";
import YouTube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";

const AddList = () => {
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
      <div className="addList_container">
        <div className="addList">{/* <img src={logo} alt="logo" /> */}</div>
        <form>
          <input
            onChange={(e) => {
              //   setUserName(e.target.value);
            }}
            required
            autoComplete="off"
            // value={userName}
            type="text"
            placeholder="list"
          />

          <button>add</button>
        </form>
      </div>
    </>
  );
};

export default AddList;
