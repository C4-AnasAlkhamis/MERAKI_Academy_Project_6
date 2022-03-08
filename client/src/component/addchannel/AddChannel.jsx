import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addChannel.css";
import YouTube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";

const AddChannel = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const createNewChannel = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `http://localhost:5000/channel`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <div className="addList_container">
        <div className="addList">{/* <img src={logo} alt="logo" /> */}</div>
        <form onSubmit={createNewChannel}>
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

          <button>add</button>
        </form>
      </div>
    </>
  );
};

export default AddChannel;
