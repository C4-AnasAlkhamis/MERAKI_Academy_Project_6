import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { format } from "timeago.js";
import YouTube from "react-youtube";
import { setVideos, setId } from "../../reducer/video/index";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Ratio } from "react-bootstrap";
import Alert from "../alert/Alert";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
    };
  });
  const opts = {
    height: "220",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const videoOnReady = (event) => {
    event.target.pauseVideo();
  };
  const getAllVideos = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/video`);
      dispatch(setVideos(result.data.result));
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getAllVideos();
  }, []);
  const goto = (id) => {
    dispatch(setId(id));
    navigate(`/video`);
  };
  return (
    <>
      <Alert />
      <Row style={{ padding: "3rem 1rem" }} xs={1} md={3} className="g-4">
        {videos.map((_, idx) => (
          <Col key={idx}>
            <Card onClick={() => goto(_.id)}>
              <Card.Body style={{ height: "300px" }}>
                {_.video.includes("youtube") ? (
                  <YouTube
                    nocookie
                    videoId={_.video.match(/(?<==)\w*/)[0]}
                    opts={opts}
                    onReady={videoOnReady}
                  />
                ) : (
                  <div>
                    <Ratio aspectRatio="16x9">
                      <iframe
                        title={_.title}
                        src={_.video}
                        frameBorder="0"
                      ></iframe>
                    </Ratio>
                  </div>
                )}
                <Card.Body
                  style={{
                    paddingLeft: "0",
                  }}
                >
                  <img
                    style={{
                      marginRight: ".5rem",
                      borderRadius: "50%",
                    }}
                    alt={_.user_name}
                    src={
                      _.image
                        ? _.image
                        : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    }
                    width="30"
                    height="30"
                  />
                  {_.user_name}
                </Card.Body>
              </Card.Body>
              <Card.Body style={{ height: "200px", overflowY: "scroll" }}>
                <Card.Title>{_.title}</Card.Title>
                <Card.Text>{_.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  {format(_.dt)}
                  {/* .match(/\W*\S*(?=T)/)[0] */}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
