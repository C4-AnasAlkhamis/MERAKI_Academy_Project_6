import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import YouTube from "react-youtube";
import { setVideos } from "../../reducer/video/index";
import { setRates } from "../../reducer/rate/index";

import { useSelector, useDispatch } from "react-redux";
import { BiDislike, BiLike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Video = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, videos, id, rates } = useSelector((state) => {
    return {
      id: state.videosReducer.id,
      videos: state.videosReducer.videos,
      token: state.loginReducer.token,
      rates: state.ratesReducer.rates,
    };
  });
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  // =========================================== //
  const getVideoById = async () => {
    try {
      const result = await axios.get(`https://backend6khamis.herokuapp.com/video/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setVideos(result.data.result));
    } catch (err) {}
  };

  // =========================================== //
  const createNewRate = async (rate) => {
    try {
      const result = await axios.post(
        `https://backend6khamis.herokuapp.com/rate`,
        { video_id: id, rate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getRateByVideoId();
    } catch (err) {
      if (err.response.statusText === "Forbidden") {
        navigate("/login")
      }
    }
  };
  // =========================================== //
  const getRateByVideoId = async () => {
    try {
      const result = await axios.get(`https://backend6khamis.herokuapp.com/rate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setRates(result.data.result));
    } catch (err) {}
  };
  useEffect(() => {
    getVideoById();
    getRateByVideoId();
  }, []);
  return (
    <>
      <Card style={{ width: "60%", height: "90%", margin: "1rem auto" }}>
        <Card.Body>
          {videos[0] && videos[0].video.includes("youtube") ? (
            <YouTube
              videoId={videos[0] && videos[0].video.match(/(?<==)\w*/)[0]}
              opts={opts}
              nocookie
            />
          ) : (
            <iframe
              frameBorder="0"
              allow="fullscreen;"
              allowFullScreen
              src={videos[0] && videos[0].video}
              title={videos[0] && videos[0].title}
              height="390"
              width="100%"
            ></iframe>
          )}
          <img
            style={{
              marginRight: ".5rem",
              borderRadius: "50%",
            }}
            alt={videos[0] && videos[0].title}
            src={
              videos[0] && videos[0].image
                ? videos[0] && videos[0].image
                : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            width="30"
            height="30"
          />
          {videos[0] && videos[0].user_name}
        </Card.Body>
        <Card.Body>
          <Card.Title>{videos[0] && videos[0].title}</Card.Title>
          <Card.Text>{videos[0] && videos[0].description}</Card.Text>
        </Card.Body>
        <Card.Body>
          <span>
            <BiDislike
              onClick={() => createNewRate(0)}
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                color: "gray",
                margin: "3px",
              }}
            />
            {rates.length && rates[0].dislikes
              ? " " + rates[0].dislikes
              : " DISLIKE"}
          </span>
          <span>
            <BiLike
              onClick={() => createNewRate(1)}
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                color: "gray",
                margin: "3px",
              }}
            />
            {rates.length && rates[0].likes ? " " + rates[0].likes : " LIKE"}
          </span>
        </Card.Body>
      </Card>
    </>
  );
};

export default Video;
