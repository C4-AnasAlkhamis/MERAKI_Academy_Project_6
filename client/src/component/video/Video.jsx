import axios from "axios";
import React, { useEffect } from "react";
import { Ratio, Card } from "react-bootstrap";
import YouTube from "react-youtube";
import { setVideos } from "../../reducer/video/index";
import { useSelector, useDispatch } from "react-redux";
import { BiDislike, BiLike } from "react-icons/bi";
const Video = () => {
  const dispatch = useDispatch();
  const { token, videos, id } = useSelector((state) => {
    return {
      id: state.videosReducer.id,
      videos: state.videosReducer.videos,
      token: state.loginReducer.token,
    };
  });
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  const getVideoById = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/video/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setVideos(result.data.result));
    } catch (error) {}
  };

  useEffect(() => {
    getVideoById();
  }, []);
  return (
    <>
      <Card style={{ width: "60%", height: "90%", margin: "1rem auto" }}>
        <Card.Body>
          {videos[0] && videos[0].video.includes("youtube") ? (
            <YouTube
              videoId={videos[0].video.match(/(?<==)\w*/)[0]}
              opts={opts}
              nocookie
            />
          ) : (
            <iframe
              frameborder="0"
              allow="fullscreen;"
              allowfullscreen
              src={videos[0].video}
              title={videos[0].title}
              height="390"
              width="100%"
            ></iframe>
          )}
          <img
            style={{
              marginRight: ".5rem",
              borderRadius: "50%",
            }}
            alt={videos[0].title}
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
        <Card.Body>
          <span>
            <BiDislike
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                color: "gray",
                margin: "3px",
              }}
            />
            LIKE
          </span>
          <span>
            <BiLike
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                color: "gray",
                margin: "3px",
              }}
            />
            DISLIKE
          </span>
        </Card.Body>
      </Card>
    </>
  );
};

export default Video;
