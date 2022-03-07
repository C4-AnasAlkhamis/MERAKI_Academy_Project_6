import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import YouTube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      https: "//www.youtube.com/watch?v=KsaXLHOrqPI",
      autoplay: 1,
    },
  };
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
            <YouTube
              videoId="KsaXLHOrqPI" // defaults -> null
              // id="KsaXLHOrqPI" // defaults -> null
              // className={string} // defaults -> null
              // containerClassName={string} // defaults -> ''
              // title={string} // defaults -> null
              // opts={opts} // defaults -> {}
              // onReady={func} // defaults -> noop
              // onPlay={func} // defaults -> noop
              // onPause={func} // defaults -> noop
              // onEnd={func} // defaults -> noop
              // onError={func} // defaults -> noop
              // onStateChange={func} // defaults -> noop
              // onPlaybackRateChange={func} // defaults -> noop
              // onPlaybackQualityChange={func} // defaults -> noop
            />

            <div className="video_info">
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
