import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import YouTube from "react-youtube";
import { setVideos, setId } from "../../reducer/video/index";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Ratio } from "react-bootstrap";
import Card from "react-bootstrap/Card";
const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const videoOnReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const getAllVideos = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/video`);
      console.log(result);
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
      <Row style={{ padding: "3rem 1rem" }} xs={1} md={3} className="g-4">
        {videos.map((_, idx) => (
          <Col key={idx}>
            <Card onClick={() => goto(_.id)}>
              <Card.Body style={{ height: "300px" }}>
                {_.video.includes("youtube") ? (
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
                  <div style={{ height: "300", width: "100%" }}>
                    <Ratio aspectRatio="16x9">
                      <iframe src={_.video} frameborder="0"></iframe>
                    </Ratio>
                  </div>
                )}

                {/* <Card.Img
                variant="top"
                width="200px"
                height="200px"
                src={_.video}
              /> */}
              </Card.Body>
              <Card.Body style={{ height: "200px" }}>
                <Card.Title>{_.title}</Card.Title>
                <Card.Text>{_.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
