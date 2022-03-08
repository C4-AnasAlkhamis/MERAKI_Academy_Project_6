import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addList.css";
import YouTube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";

const AddList = () => {
  const [list, setList] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const createNewList = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `http://localhost:5000/list`,
        { list },
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
        <form onSubmit={createNewList}>
          <input
            onChange={(e) => {
              setList(e.target.value);
            }}
            required
            autoComplete="off"
            value={list}
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
