import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ratio, Card } from "react-bootstrap";

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
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  // const videoOnReady = (event) => {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // };
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
  // console.log(videos[0].video.match(/([A-Z])\w+/)[0]);
  return (
    <>
      <Card style={{ width: "60%", height: "90vh", margin: "1rem auto" }}>
        {videos[0] && videos[0].video.includes("youtube") ? (
          <YouTube
            videoId={videos[0].video.match(/([A-Z])\w+/)[0]}
            opts={opts}
          />
        ) : (
          <div>
            <Ratio aspectRatio="16x9">
              <iframe
                frameborder="0"
                allow="fullscreen;"
                allowfullscreen
                src={videos[0].video}
              ></iframe>
            </Ratio>
          </div>
        )}
        <Card.Body>
          <img
            style={{
              marginRight: ".5rem",
              borderRadius: "50%",
            }}
            alt="user image"
            src={
              videos[0].image
                ? videos[0].image
                : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            width="30"
            height="30"
          />
          {videos[0].user_name}
        </Card.Body>
        <Card.Body>
          <Card.Title>{videos[0].title}</Card.Title>
          <Card.Text>{videos[0].description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Video;
