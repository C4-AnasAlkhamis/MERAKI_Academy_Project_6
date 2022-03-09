import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ratio } from "react-bootstrap";

import YouTube from "react-youtube";
import { setVideos } from "../../reducer/video/index";
import { useSelector, useDispatch } from "react-redux";
const Video = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos, id } = useSelector((state) => {
    return {
      id: state.videosReducer.id,
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  const videoOnReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const getVideoById = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/video/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      dispatch(setVideos(result.data.result));
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getVideoById();
  }, []);
  console.log(id, videos);
  return (
    <>
      {videos[0] && videos[0].video.includes("youtube") ? (
        <YouTube
          videoId="KsaXLHOrqPI"
          onPlay={(e) => {
            console.log(e);

            e.target.mute();
          }}
          opts={opts}
          onReady={videoOnReady}
        />
      ) : (
        <div>
          <Ratio aspectRatio="16x9">
            <iframe src={videos[0].video}></iframe>
          </Ratio>
        </div>
      )}
    </>
  );
};

export default Video;
