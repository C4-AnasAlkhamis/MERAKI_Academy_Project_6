import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { format } from "timeago.js";

import YouTube from "react-youtube";
import { setVideos, setId } from "../../reducer/video/index";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Ratio,
  Navbar,
  Container,
  NavDropdown,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos, image, name } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      image: state.loginReducer.image,
      name: state.loginReducer.name,
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
    // access to player in all event handlers via event.target
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
      <Navbar>
        <Container>
          <div class="btn-group">
            <button class="btn btn-secondary btn-lg" type="button">
              Filter By Dates
            </button>
            <button
              type="button"
              class="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
              <li>11</li>
              <li>111</li>
              <li>1</li>
              <li>1</li>
            </ul>
          </div>
        </Container>
      </Navbar>
      <Row style={{ padding: "3rem 1rem" }} xs={1} md={3} className="g-4">
        {videos.map((_, idx) => (
          <Col key={idx}>
            <Card onClick={() => goto(_.id)}>
              <Card.Body style={{ height: "300px" }}>
                {_.video.includes("youtube") ? (
                  <YouTube
                    videoId={_.video.match(/([A-Z])\w+/)[0]}
                    opts={opts}
                    onReady={videoOnReady}
                  />
                ) : (
                  <div>
                    <Ratio aspectRatio="16x9">
                      <iframe src={_.video} frameBorder="0"></iframe>
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
                    alt="user image"
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
              <Card.Body style={{ height: "200px" }}>
                <Card.Title>{_.title}</Card.Title>
                <Card.Text>{_.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  {format(_.dt.match(/\W*\S*(?=T)/)[0])}
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
